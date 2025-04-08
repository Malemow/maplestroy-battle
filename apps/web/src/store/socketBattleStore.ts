import { io, Socket } from "socket.io-client"
import { create } from "zustand"
import type { BattleRoom } from "@repo/types/Battle"
import { CharacterClass } from "@repo/types/Battle"

const socket = io("/", {
    path: "/ws-battle",
    withCredentials: true,
})

interface SocketBattleRoom {
    battleRoom?: BattleRoom
    setBattleRoom: (room: BattleRoom) => void
    initBattleRoom: () => void
    joinBattleRoom: (characterClass: CharacterClass) => void
    leaveBattleRoom: () => void
    readyBattleRoom: () => void
}

interface SocketInfo {
    socket: Socket
    openSocket: () => void
    closeSocket: () => void
    resetSocket: () => void
}

export const useSocketBattleStore = create<SocketInfo & SocketBattleRoom>((set) => {
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

    const createBattleRoomOptions = (): SocketBattleRoom => {
        const setBattleRoom = (battleRoom: BattleRoom) => {
            console.log(battleRoom)
            set(() => ({ battleRoom }))
        }
        const initBattleRoom = () => set(() => ({ battleRoom: undefined }))
        const joinBattleRoom = (characterClass: CharacterClass) => {
            socket.emit("joinBattleRoom", characterClass)
        }
        const leaveBattleRoom = () => {
            socket.emit("leaveBattleRoom")
        }
        const readyBattleRoom = () => {
            socket.emit("readyBattleRoom")
        }

        return {
            battleRoom: undefined,
            setBattleRoom,
            initBattleRoom,
            joinBattleRoom,
            leaveBattleRoom,
            readyBattleRoom,
        }
    }

    return {
        ...createSocketOptions(),
        ...createBattleRoomOptions(),
    }
})
