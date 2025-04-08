import { Request } from "express"
import pino from "pino"
import pinoHttp from "pino-http"
import pinoPretty from "pino-pretty"
import chalk from "chalk"

const isDev = process.env.NODE_ENV !== "production"

const pinoStream = pinoPretty({
    colorize: true,
    translateTime: "HH:MM:ss.l",
    ignore: "pid,hostname",
})

// Pino main logger
const logger = pino(
    {
        level: isDev ? "debug" : "info",
    },
    pinoStream
)

function getColorByStatus(statusCode: number) {
    if (statusCode >= 500) return chalk.redBright
    if (statusCode >= 400) return chalk.yellowBright
    if (statusCode >= 300) return chalk.cyanBright
    return chalk.greenBright
}

// HTTP logger middleware
const httpLogger = pinoHttp({
    logger,
    customLogLevel(req, res, err) {
        if (res.statusCode >= 500 || err) return "error"
        if (res.statusCode >= 400) return "warn"
        return "info"
    },
    serializers: {
        req() {},
        res() {},
    },
    customSuccessMessage(req: Request, res) {
        const statusCode = res.statusCode
        const color = getColorByStatus(statusCode)

        const method = chalk.blue(req.method)
        const url = chalk.whiteBright(req.originalUrl)
        const status = color(statusCode.toString())
        const ip = chalk.gray(req.socket.remoteAddress || "-")

        return `${method} ${url} ${status} ${ip}`
    },
})

export { logger, httpLogger }
