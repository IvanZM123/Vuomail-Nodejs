// Import modules
import express from "express";

export class AuthControllerComponent {
    logout(req: express.Request, res: express.Response): void {
        // Close session.
        req.logOut();

        // Redirect login page.
        res.redirect("/login");
    }
}
