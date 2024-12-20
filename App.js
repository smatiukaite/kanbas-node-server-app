import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import UsersRoutes from './Kanbas/Users/routes.js';
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);

app.use(express.json());

Hello(app)
Lab5(app)
UsersRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);

app.listen(process.env.PORT || 4000)