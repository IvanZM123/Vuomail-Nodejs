// Import module
import express from "express";

// Import middleware
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
const authMiddleware = new AuthMiddleware();

// Import controller
import { HomeControllerComponent } from "./home.controller";
const homeController = new HomeControllerComponent();

export class HomeRoutesComponent {
    constructor(public router: express.Router) {
        this.index();
        this.login();
    }

    private index(): void {
        this.router.get(
            "/",
            authMiddleware.notLoggedIn,
            homeController.index
        );
    }

    private login(): void {
        this.router.get(
            "/login",
            authMiddleware.notLoggedIn,
            homeController.login
        );
    }
};