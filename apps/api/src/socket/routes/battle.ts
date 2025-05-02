import type { Server, Socket } from "socket.io"
import { battleControllers } from "@/socket/controllers"
import { CharacterClass } from "@repo/types/Battle"
import type { Request } from "express"

const router = async (io: Server, socket: Socket) => {
    socket.on("readyBattleRoom", () => battleControllers.readyBattleRoom(io, socket.request as Request))
    socket.on("getBattleRoom", () => battleControllers.getBattleRoom(io))
    socket.on("joinBattleRoom", (characterClass: CharacterClass) =>
        battleControllers.joinBattleRoom(io, socket.request as Request, characterClass)
    )
    socket.on("leaveBattleRoom", () => battleControllers.leaveBattleRoom(io, socket.request as Request))
    socket.on("disconnect", () => battleControllers.disconnect(io, socket.request as Request))
}

export default router
