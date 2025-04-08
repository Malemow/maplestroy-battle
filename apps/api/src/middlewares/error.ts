import type { Request, Response, NextFunction } from "express"

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Server Error", error: err.message })
}

export default {
    error,
}
