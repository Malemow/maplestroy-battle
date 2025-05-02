import type { Server } from "socket.io"
import { battleServices } from "@/socket/services"
import { CharacterClass } from "@repo/types/Battle"
import type { Request } from "express"
import { sendResponse } from "@/socket/utils/response"

const disconnect = (io: Server, req: Request) => {
    const battleRoom = battleServices.getBattleRoom()

    if (req.session.userInfo.gameRoomId === battleRoom.id) {
        const battleRoom = battleServices.leaveBattleRoom(req.session.userInfo)
        req.session?.save()

        sendResponse(io, "battleRoom", battleRoom)
    }
}

const getBattleRoom = (io: Server) => {
    sendResponse(io, "battleRoom", battleServices.getBattleRoom())
}

const joinBattleRoom = (io: Server, req: Request, characterClass: CharacterClass) => {
    if (!req.session.userInfo.gameRoomId) {
        const battleRoom = battleServices.joinBattleRoom(req.session.userInfo, characterClass)
        req.session?.save()

        sendResponse(io, "battleRoom", battleRoom)
    }
}

const leaveBattleRoom = (io: Server, req: Request) => {
    const battleRoom = battleServices.getBattleRoom()

    if (req.session.userInfo.gameRoomId === battleRoom.id) {
        const battleRoom = battleServices.leaveBattleRoom(req.session.userInfo)
        req.session?.save()

        sendResponse(io, "battleRoom", battleRoom)
    }
}

const readyBattleRoom = (io: Server, req: Request) => {
    sendResponse(io, "battleRoom", battleServices.readyPlayer(req.session.userInfo))
}

export default { disconnect, getBattleRoom, joinBattleRoom, leaveBattleRoom, readyBattleRoom }
