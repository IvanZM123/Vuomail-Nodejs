// Import module
import express from "express";

// Import components routes
import { HomeRoutesComponent } from "../components/home/home.routes";
import { AuthRoutesComponent } from "../components/auth/auth.routes";
import { MailRoutesComponent } from "../components/mail/mail.routes";

const routes: express.Router[] = [
    new HomeRoutesComponent(express()).router,
    new AuthRoutesComponent(express()).router,
    new MailRoutesComponent(express()).router
];

export class IndexRoutes {
    constructor(public root: express.Express) {
        this.executeRoutes();
    }

    private executeRoutes(): void {
        for (let route of routes) {
            this.root.use(route);
        }
    }
};
