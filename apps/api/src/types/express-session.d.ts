import "express-session"
import { UserInfo } from "@repo/types/User"
import { Session } from "express-session"
import type { Store } from "express-session"

declare module "express-session" {
    interface SessionData {
        userInfo?: UserInfo
    }
}

declare module "http" {
    interface IncomingMessage {
        session?: Session & Partial<SessionData>
        sessionStore?: Store
    }
}
