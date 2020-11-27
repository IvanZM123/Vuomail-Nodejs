// Import module
import express from "express";

const expression = {
    email: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};

export function verifyMail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const receiver = expression.email.test(req.body.receiver);
    const subject = !!req.body.subject;
    const text = !!req.body.text

    // Verify send mail
    if ( receiver && subject && text ) {
        return next();
    }
    
    // Messages
    req.flash("color", "danger");
    req.flash("msg", "Los datos que estas ingresando no son validos, necesitas enviar un email, un asunto y un mensaje.");

    // Redirect
    res.redirect("/mails/mailing");
}
