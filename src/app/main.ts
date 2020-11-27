// Import modules
import session from "express-session";
import flash from "connect-flash";
import mongoose from "mongoose";
import passport from "passport";
import express from "express";
import morgan from "morgan";
import http from "http";
import path from "path";

// Import environment
import { environments } from "./environments/environments";

// Import routes
import { IndexRoutes } from "./routes/index.routes";

// Imports strategies
import "./components/auth/strategies/google.strategy";

export class Nodemail {
    constructor(
        private app: express.Express,
        private server: http.Server
    ) {
        this.settings();
        this.middlewares();
        this.routes();
        this.staticFiles();
    }

    private settings(): void {
        this.app.set("view engine", "ejs");
    }

    private middlewares(): void {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: "vuemail-nodejs-app",
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
    }

    private routes(): void {
        const { root } = new IndexRoutes(express());
        this.app.use(root);
    }

    private staticFiles(): void {
        const root: string = path.resolve("public");
        this.app.use(express.static(root));
    }

    start(): void {
        const port = environments.PORT;
        this.server.listen(port, () => {
            console.log(`App execute in port:${ port }`);
        });
    }

    connectDB(): void {
        mongoose.connect(environments.DATABASE_URI as string, {
            useFindAndModify: false,
            useNewUrlParser: true
        })
        .then(() => console.log("Connect db is successfully"))
        .catch(err => console.error(err));
    }
}
