// Import module
import express from "express";

export class AuthMiddleware {
    loggedIn(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/login");
        }
    }

    notLoggedIn(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (req.isAuthenticated()) {
            res.redirect("/mails/dashboard");
        } else {
            next();
        }
    }
};
