// src/api/user/user.controller.ts
import { Request, Response } from "express"
import { UserInfo } from "@repo/types/User"
import { userService } from "services"

const getUser = async (req: Request, res: Response): Promise<void> => {
    res.json(res.locals.userInfo)
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body

    let userInfo: UserInfo

    try {
        userInfo = userService.createAndSaveUserInfo(req.session, name)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(400).send("發生未知錯誤")
        }
        return
    }

    res.status(201).json(userInfo)
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    userService.removeUserInfo(req.session)
    res.status(204).end()
}

export default {
    getUser,
    createUser,
    deleteUser,
}
