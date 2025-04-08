import express from "express"
import { userControllers } from "@/controllers"
import { authMiddleware } from "middlewares"
import expressAsyncHandler from "express-async-handler"

const userRouter = express.Router()

userRouter.get("", authMiddleware.setUserContext, userControllers.getUser)
userRouter.post("", express.json(), expressAsyncHandler(userControllers.createUser))
userRouter.delete("", authMiddleware.setUserContext, expressAsyncHandler(userControllers.deleteUser))

export default userRouter
