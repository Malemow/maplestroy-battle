import { create } from "zustand"
import { io, Socket } from "socket.io-client"
import { ChatRoomMessage } from "@repo/types/ChatRoomMessage"
import { OnlineUser } from "@repo/types/OnlineList"
import { CHAT_ROOM_MAX_MESSAGES } from "@repo/constant"

interface SocketOnlineList {
    onlineList: OnlineUser
    setOnlineList: (list: OnlineUser) => void
}

interface SocketChatRoom {
    chatRoomMessageList: ChatRoomMessage[]
    setChatRoomMessageList: (message: ChatRoomMessage) => void
    sendChatMessage: (message: string) => void
    initChatRoomMessageList: () => void
}

interface SocketInfo {
    socket: Socket
    openSocket: () => void
    closeSocket: () => void
    resetSocket: () => void
}

const socket = io("/", {
    path: "/ws",
    withCredentials: true,
})

export const useSocketStore = create<SocketInfo & SocketChatRoom & SocketOnlineList>((set) => {
    const createSocketOptions = (): SocketInfo => {
        const openSocket = () => socket.connect()
        const closeSocket = () => socket.disconnect()
        const resetSocket = () => {
            closeSocket()
            openSocket()
        }

        return {
            socket,
            openSocket,
            closeSocket,
            resetSocket,
        }
    }

    const createOnlineListOptions = (): SocketOnlineList => {
        const onlineList = {}
        const setOnlineList = (list: OnlineUser) => set(() => ({ onlineList: list }))

        return {
            onlineList,
            setOnlineList,
        }
    }

    const createChatRoomOptions = (): SocketChatRoom => {
        const chatRoomMessageList: SocketChatRoom["chatRoomMessageList"] = []
        const setChatRoomMessageList = (newMessage: ChatRoomMessage) => {
            set((state) => {
                const updatedMessages = [...state.chatRoomMessageList, newMessage]

                // 保證訊息不會過多，限制顯示數量
                if (updatedMessages.length > CHAT_ROOM_MAX_MESSAGES) {
                    updatedMessages.shift() // 移除最舊的訊息
                }

                return { chatRoomMessageList: updatedMessages }
            })
        }

        const initChatRoomMessageList = () => set(() => ({ chatRoomMessageList: [] }))
        const sendChatMessage = (message: string) => {
            socket.emit("chatRoomMessage", message)
        }

        return {
            chatRoomMessageList,
            setChatRoomMessageList,
            initChatRoomMessageList,
            sendChatMessage,
        }
    }

    return {
        ...createSocketOptions(),
        ...createOnlineListOptions(),
        ...createChatRoomOptions(),
    }
})
