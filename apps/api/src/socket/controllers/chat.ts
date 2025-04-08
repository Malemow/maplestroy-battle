import type { Server } from "socket.io"
import type { IncomingMessage } from "http"
import { chatServices } from "@/socket/services"
import type { ChatRoomMessage } from "@repo/types/ChatRoomMessage"

const getOnlineList = (io: Server) => {
    const onlineUsers = chatServices.getOnlineUsers()

    io.emit("onlineList", onlineUsers)
}

const sendChatRoomMessage = (io: Server, req: IncomingMessage, message: ChatRoomMessage["message"]) => {
    const userInfo = chatServices.getUserInfo(req.session)
    const chatRoomMessage = chatServices.createMessage.send(userInfo, message)

    io.emit("chatRoomMessage", chatRoomMessage)
}

const disconnect = (io: Server, req: IncomingMessage) => {
    const userInfo = chatServices.getUserInfo(req.session)
    chatServices.deleteOnlineUsers(userInfo)

    const onlineUsers = chatServices.getOnlineUsers()
    io.emit("onlineList", onlineUsers)

    const chatRoomMessage = chatServices.createMessage.leave(userInfo)
    io.emit("chatRoomMessage", chatRoomMessage)
}

const joinAndSaveOnlineList = (io: Server, req: IncomingMessage) => {
    const userInfo = chatServices.getUserInfo(req.session)
    chatServices.addOnlineUsers(userInfo)

    const chatRoomMessage = chatServices.createMessage.join(userInfo)
    io.emit("chatRoomMessage", chatRoomMessage)
}

export default {
    getOnlineList,
    sendChatRoomMessage,
    disconnect,
    joinAndSaveOnlineList,
}
