import { useSocketStore } from "@/store/socketStore.ts"
import { useEffect } from "react"
import type { ChatRoomMessage } from "@repo/types/ChatRoomMessage"
import { handleSocketResponse } from "@/utils/socketClient.ts"

export const useChatRoomMessageList = () => {
    const socket = useSocketStore((state) => state.socket)
    const setChatRoomMessageList = useSocketStore((state) => state.setChatRoomMessageList)

    useEffect(() => {
        const handleList = (list: ChatRoomMessage) => {
            setChatRoomMessageList(list)
        }

        socket.on(...handleSocketResponse<ChatRoomMessage>("chatRoomMessage", handleList))

        return () => {
            socket.off("chatRoomMessage", handleList)
        }
    }, [])
}
