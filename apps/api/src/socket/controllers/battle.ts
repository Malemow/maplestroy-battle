import type { Server } from "socket.io"
import { battleServices } from "@/socket/services"
import { CharacterClass } from "@repo/types/Battle"
import type { IncomingMessage } from "http"

const disconnect = (io: Server, req: IncomingMessage) => {
    io.emit("battleRoom", battleServices.leaveBattleRoom(req.session.userInfo))
}

const getBattleRoom = (io: Server) => {
    io.emit("battleRoom", battleServices.getBattleRoom())
}

const joinBattleRoom = (io: Server, req: IncomingMessage, characterClass: CharacterClass) => {
    io.emit("battleRoom", battleServices.joinBattleRoom(req.session.userInfo, characterClass))
}

const leaveBattleRoom = (io: Server, req: IncomingMessage) => {
    io.emit("battleRoom", battleServices.leaveBattleRoom(req.session.userInfo))
}

const readyBattleRoom = (io: Server, req: IncomingMessage) => {
    io.emit("battleRoom", battleServices.readyPlayer(req.session.userInfo))
}

export default { disconnect, getBattleRoom, joinBattleRoom, leaveBattleRoom, readyBattleRoom }
