import { useSocketBattleStore } from "@/store/socketBattleStore"
import { useEffect } from "react"
import type { BattleRoom } from "@repo/types/Battle"
import { handleSocketResponse } from "@/utils/socketClient"
import { SocketEvents } from "@repo/constant"

export const useBattleRoomMessageList = () => {
    const setBattleRoom = useSocketBattleStore((state) => state.setBattleRoom)
    const socket = useSocketBattleStore((state) => state.socket)

    useEffect(() => {
        const handleList = (room: BattleRoom) => {
            setBattleRoom(room)
        }

        socket.on(...handleSocketResponse<BattleRoom>(SocketEvents.BattleRoom, handleList))
        socket.emit(SocketEvents.GetBattleRoom)

        return () => {
            socket.off(SocketEvents.BattleRoom, handleList)
        }
    }, [])
}
