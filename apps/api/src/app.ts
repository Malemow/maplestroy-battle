import express from "express"
import http from "http"
import { createSocketIo } from "@/socket"
import { userRouter } from "@/routes"
import { errorMiddleware } from "middlewares"
import cors from "cors"
import type { Express } from "express"
import type { Server } from "http"
import { SERVER_PORT } from "@/constant"
import { httpLogger } from "@/libs/logger"
import { SESSION_MIDDLEWARE } from "@/constant"

const createSocketIoServer = (app: Express): Server => {
    const server = http.createServer(app)
    createSocketIo(server)

    return server
}

const createServer = (): {
    server: Server
    run: () => void
} => {
    const app = express()
    app.use(
        cors({
            origin: true,
            methods: "*",
            allowedHeaders: ["Content-Type"],
            credentials: true,
        })
    )

    app.use(httpLogger)
    createGlobalMiddleware(app)
    createRouter(app)

    return {
        server: createSocketIoServer(app),
        run() {
            this.server.listen(SERVER_PORT, () => {
                console.log(`Server running on port ${SERVER_PORT}`)
            })
        },
    }
}

const createGlobalMiddleware = (app: Express): void => {
    app.use(SESSION_MIDDLEWARE)
}

const createRouter = (app: Express): void => {
    app.use(errorMiddleware.error)
    app.use("/api/user", userRouter)
}

const main = (): void => {
    createServer().run()
}

main()
