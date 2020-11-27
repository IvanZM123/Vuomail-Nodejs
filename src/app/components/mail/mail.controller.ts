// Import module
import express from "express";
import nodemailer from "nodemailer";

// Import environment
import { environments } from "../../environments/environments";

// Import mail repository
import { MailRepository } from "../../repository/mail/mail.repository";
const mailRepository = new MailRepository();

export class MailControllerComponent {
    dashboard(req: express.Request, res: express.Response): void {
        res.render("dashboard", {
            user: req.user || undefined
        });
    }

    sections(req: express.Request, res: express.Response): void {
        res.render("mail-sections", {
            user: req.user || undefined
        });
    }

    mailing(req: express.Request, res: express.Response): void {
        res.render("mailing", {
            user: req.user || undefined,
            color: req.flash("color"),
            msg: req.flash("msg")
        });
    }

    async mailbox(req: express.Request, res: express.Response): Promise<void> {
        // Get user
        const user: any = req.user;

        try {
            // Get mails
            const mails = await mailRepository.findByOwner(user.email);

            res.render("mailbox", {
                user: req.user || undefined,
                color: req.flash("color"),
                msg: req.flash("msg"),
                mails
            });
        } catch (error) {
            // Messages
            req.flash("color", "danger");
            req.flash("msg", "Ha ocurrido un error durante la operacion");

            res.redirect("/mails/mailing");
        }
    }

    async viewer(req: express.Request, res: express.Response) {
        // Get paramas
        const id = req.params.id;

        // Get user
        const user: any = req.user;

        // Search email
        const mail = await mailRepository.findById(id);

        // Render page
        res.render("viewer", { user, mail });
    }

    async send(req: express.Request, res: express.Response): Promise<void> {
        // Get properties user.
        const user: any = req.user;

        // Create transport
        const transport: any = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                clientId: environments.GOOGLE_CLIENT_ID,
                clientSecret: environments.GOOGLE_CLIENT_SECRET
            }
        });

        // Send mail to Gmail
        try {
            const info = await transport.sendMail({
                from: user.email,
                to: req.body.receiver,
                subject: req.body.subject,
                text: req.body.text,
                auth: {
                    user: user.email,
                    accessToken: user.access_token
                }
            });

            // Save mail in the database
            await mailRepository.schema({
                from: user.email,
                to: req.body.receiver,
                subject: req.body.subject,
                text: req.body.text
            }).save();
            
            // Messages
            req.flash("color", "success");
            req.flash("msg", "Se ha enviado el email con exito.");

            res.redirect("/mails/mailbox");
        } catch (error) {
            // Messages
            req.flash("color", "danger");
            req.flash("msg", "No se ha podido enviar en email, intentelo mas tarde.");

            res.redirect("/mails/mailing");
        }

    }
};
