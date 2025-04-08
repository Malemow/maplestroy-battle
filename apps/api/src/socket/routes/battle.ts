import type { Server, Socket } from "socket.io"
import { battleControllers } from "@/socket/controllers"
import { CharacterClass } from "@repo/types/Battle"

const router = async (io: Server, socket: Socket) => {
    socket.on("readyBattleRoom", () => battleControllers.readyBattleRoom(io, socket.request))
    socket.on("getBattleRoom", () => battleControllers.getBattleRoom(io))
    socket.on("joinBattleRoom", (characterClass: CharacterClass) =>
        battleControllers.joinBattleRoom(io, socket.request, characterClass)
    )
    socket.on("leaveBattleRoom", () => battleControllers.leaveBattleRoom(io, socket.request))
    socket.on("disconnect", () => battleControllers.disconnect(io, socket.request))
}

export default router
