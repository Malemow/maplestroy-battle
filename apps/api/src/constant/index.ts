import { SERVER_DEFAULT_PORT, DEFAULT_SECRET } from "@repo/constant"
import session from "express-session"

export const SERVER_PORT = process.env.SERVER_PORT || SERVER_DEFAULT_PORT
export const SESSION_MIDDLEWARE = session({
    secret: process.env.SESSION_MIDDLEWARE || DEFAULT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
})
