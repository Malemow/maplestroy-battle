import type { Socket } from "socket.io"
import type { ExtendedError } from "socket.io"
import { userService } from "services"

const checkIsLogin = (socket: Socket, next: (err?: ExtendedError) => void) => {
    if (!userService.isLogin(socket.request.session)) {
        const err = new Error("未登入") as ExtendedError
        return next(err)
    }

    next()
}

export default {
    checkIsLogin,
}
