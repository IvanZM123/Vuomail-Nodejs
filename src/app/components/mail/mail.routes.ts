// Import module
import express from "express";

// Import middleware
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import rules
import * as rules from "./mail.rules";

// Import mail controller
import { MailControllerComponent } from "./mail.controller";
const mailController = new MailControllerComponent();

export class MailRoutesComponent {
    constructor(public router: express.Router) {
        this.dashboard();
        this.sections();
        this.mailing();
        this.mailbox();
        this.viewer();
        this.send();
    }

    private dashboard(): void {
        this.router.get(
            "/mails/dashboard",
            authMiddleware.loggedIn,
            mailController.dashboard
        );
    }

    private sections(): void {
        this.router.get(
            "/mails/sections",
            authMiddleware.loggedIn,
            mailController.sections
        );
    }

    private mailing(): void {
        this.router.get(
            "/mails/mailing",
            authMiddleware.loggedIn,
            mailController.mailing
        );
    }

    private mailbox(): void {
        this.router.get
        (
            "/mails/mailbox",
            authMiddleware.loggedIn,
            mailController.mailbox
        );
    }

    private viewer(): void {
        this.router.get(
            "/mails/viewer/:id",
            authMiddleware.loggedIn,
            mailController.viewer
        );
    }

    private send(): void {
        this.router.post(
            "/mails/send",
            authMiddleware.loggedIn,
            rules.verifyMail,
            mailController.send
        );
    }
};
