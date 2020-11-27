// Import module
import express from "express";

export class HomeControllerComponent {
    index(req: express.Request, res: express.Response): void {
        res.render("index");
    }

    login(req: express.Request, res: express.Response): void {
        res.render("login");
    }
};