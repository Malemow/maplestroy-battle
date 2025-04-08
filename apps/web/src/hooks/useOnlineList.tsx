import { useSocketStore } from "@/store/socketStore.ts"
import { useEffect } from "react"
import type { OnlineUser } from "@repo/types/OnlineList.ts"

export const useOnlineList = () => {
    const socket = useSocketStore((state) => state.socket)
    const setOnlineList = useSocketStore((state) => state.setOnlineList)

    useEffect(() => {
        const handleList = (list: OnlineUser) => {
            setOnlineList(list)
        }

        socket.on("onlineList", handleList)
        socket.emit("getOnlineList")

        return () => {
            socket.off("onlineList", handleList)
        }
    }, [])
}
