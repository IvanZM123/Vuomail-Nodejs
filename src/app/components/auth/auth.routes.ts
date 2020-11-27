// Import module
import passport from "passport";
import express from "express";

// Import middleware
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import auth controller
import { AuthControllerComponent } from "./auth.controller";
const authController = new AuthControllerComponent();

export class AuthRoutesComponent {
    constructor(public router: express.Router) {
        this.authGoogle();
        this.logout();
    }

    private authGoogle(): void {
        // Start google.
        this.router.get(
            "/auth/google",
            authMiddleware.notLoggedIn,
            passport.authenticate("auth-google", {
                scope: [
                    "profile",
                    "email",
                    "openid",
                    "https://mail.google.com"
                ]
            })
        );

        // Google callback.
        this.router.get(
            "/auth/google/callback",
            authMiddleware.notLoggedIn,
            passport.authenticate("auth-google", {
                successRedirect: "/mails/dashboard",
                failureRedirect: "/"
            })
        );
    }

    private logout(): void {
        this.router.get(
            "/auth/logout",
            authController.logout
        );
    }
};
