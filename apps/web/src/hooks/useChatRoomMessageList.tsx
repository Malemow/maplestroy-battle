import { useSocketStore } from "@/store/socketStore.ts"
import { useEffect } from "react"
import type { ChatRoomMessage } from "@repo/types/ChatRoomMessage"

export const useChatRoomMessageList = () => {
    const socket = useSocketStore((state) => state.socket)
    const setChatRoomMessageList = useSocketStore((state) => state.setChatRoomMessageList)

    useEffect(() => {
        const handleList = (list: ChatRoomMessage) => {
            setChatRoomMessageList(list)
        }

        socket.on("chatRoomMessage", handleList)

        return () => {
            socket.off("chatRoomMessage", handleList)
        }
    }, [])
}
