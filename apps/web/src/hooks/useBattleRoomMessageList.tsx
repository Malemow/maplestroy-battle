import { useSocketBattleStore } from "@/store/socketBattleStore"
import { useEffect } from "react"
import type { BattleRoom } from "@repo/types/Battle"

export const useBattleRoomMessageList = () => {
    const setBattleRoom = useSocketBattleStore((state) => state.setBattleRoom)
    const socket = useSocketBattleStore((state) => state.socket)

    useEffect(() => {
        const handleList = (room: BattleRoom) => {
            setBattleRoom(room)
        }

        socket.on("battleRoom", handleList)
        socket.emit("getBattleRoom")

        return () => {
            socket.off("battleRoom", handleList)
        }
    }, [])
}
