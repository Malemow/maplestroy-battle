import type { Server, Socket } from "socket.io"
import { chatControllers } from "@/socket/controllers"
import type { ChatRoomMessage } from "@repo/types/ChatRoomMessage"
import type { Request } from "express"

const router = async (io: Server, socket: Socket) => {
    chatControllers.joinAndSaveOnlineList(io, socket.request as Request)

    socket.on("getOnlineList", () => chatControllers.getOnlineList(io))
    socket.on("chatRoomMessage", (message: ChatRoomMessage["message"]) =>
        chatControllers.sendChatRoomMessage(io, socket.request as Request, message)
    )
    socket.on("disconnect", () => chatControllers.disconnect(io, socket.request as Request))
}

export default router
