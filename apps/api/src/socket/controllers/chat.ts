import type { Server } from "socket.io"
import type { Request } from "express"
import { chatServices } from "@/socket/services"
import type { ChatRoomMessage } from "@repo/types/ChatRoomMessage"
import { sendResponse } from "@/socket/utils/response"

const getOnlineList = (io: Server) => {
    const onlineUsers = chatServices.getOnlineUsers()

    sendResponse(io, "onlineList", onlineUsers)
}

const sendChatRoomMessage = (io: Server, req: Request, message: ChatRoomMessage["message"]) => {
    const userInfo = chatServices.getUserInfo(req.session)
    const chatRoomMessage = chatServices.createMessage.send(userInfo, message)

    sendResponse(io, "chatRoomMessage", chatRoomMessage)
}

const disconnect = (io: Server, req: Request) => {
    const userInfo = chatServices.getUserInfo(req.session)
    chatServices.deleteOnlineUsers(userInfo)

    const onlineUsers = chatServices.getOnlineUsers()
    sendResponse(io, "onlineList", onlineUsers)

    const chatRoomMessage = chatServices.createMessage.leave(userInfo)
    sendResponse(io, "chatRoomMessage", chatRoomMessage)
}

const joinAndSaveOnlineList = (io: Server, req: Request) => {
    const userInfo = chatServices.getUserInfo(req.session)
    chatServices.addOnlineUsers(userInfo)

    const chatRoomMessage = chatServices.createMessage.join(userInfo)
    sendResponse(io, "chatRoomMessage", chatRoomMessage)
}

export default {
    getOnlineList,
    sendChatRoomMessage,
    disconnect,
    joinAndSaveOnlineList,
}
