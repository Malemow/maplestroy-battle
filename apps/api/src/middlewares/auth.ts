import type { Request, Response, NextFunction } from "express"
import { userService } from "services"

const setUserContext = (req: Request, res: Response, next: NextFunction) => {
    if (!userService.isLogin(req.session)) {
        res.status(401).end()
        return
    }

    res.locals.userInfo = userService.getUserInfo(req.session)

    next()
}

export default {
    setUserContext,
}
