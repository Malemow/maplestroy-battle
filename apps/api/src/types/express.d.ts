import "express"
import { UserInfo } from "@repo/types/User"

declare module "express-serve-static-core" {
    interface Response {
        locals: {
            userInfo?: UserInfo
        }
    }
}
