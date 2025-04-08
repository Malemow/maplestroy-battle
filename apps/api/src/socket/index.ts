import { Server as SocketIo } from "socket.io"
import type { Server } from "http"
import { chatRouter, battleRouter } from "@/socket/routes"
import { SESSION_MIDDLEWARE } from "@/constant"
import { authMiddleware } from "socket/middlewares"

let io: SocketIo
let ioBattle: SocketIo

export const createSocketIo = (server: Server) => {
    io = new SocketIo(server, {
        path: "/ws",
        cors: {
            origin: true,
            methods: "*",
            allowedHeaders: ["Content-Type"],
            credentials: true,
        },
    })

    ioBattle = new SocketIo(server, {
        path: "/ws-battle",
        cors: {
            origin: true,
            methods: "*",
            allowedHeaders: ["Content-Type"],
            credentials: true,
        },
    })

    io.engine.use(SESSION_MIDDLEWARE)
    ioBattle.engine.use(SESSION_MIDDLEWARE)

    io.use(authMiddleware.checkIsLogin)
    ioBattle.use(authMiddleware.checkIsLogin)

    io.on("connection", (socket) => chatRouter(io, socket))
    ioBattle.on("connection", (socket) => battleRouter(ioBattle, socket))
}
