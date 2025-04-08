import { BattleStatus, Character, CharacterClass, Player, PlayerStats } from "@repo/types/Battle"
import { nanoid } from "nanoid"
import dayjs from "@repo/lib/dayjs"
import type { UserInfo } from "@repo/types/User"
import { BASE_PLAYER_STATS, CHARACTER_CLASS_LIST_MAP } from "@repo/constant/battle"
import { MAX_BATTLE_ROOM_PEOPLE } from "@repo/constant"
import type { BattleRoom } from "@/types/battle"

const createBaseBattleRoom = (): BattleRoom => {
    return {
        id: nanoid(),
        players: [],
        round: 0,
        createdAt: dayjs(),
        _status: BattleStatus.WaitingForPlayers, // 私有變數
        get status() {
            return this._status
        },
        set status(value) {
            if (this._status !== value) {
                this._status = value
                this.statusChangeAt = dayjs()
            }
        },
        get isFull() {
            return this.players.length >= MAX_BATTLE_ROOM_PEOPLE
        },
        statusChangeAt: dayjs(),
    }
}

let battleRoom: BattleRoom = createBaseBattleRoom()

const isReady = (): boolean =>
    battleRoom.status === BattleStatus.WaitingForPlayers || battleRoom.status === BattleStatus.ReadyToStart
const selectBattleRoom = (): BattleRoom => battleRoom
const initBattleRoom = (): BattleRoom => {
    battleRoom = createBaseBattleRoom()

    return battleRoom
}
const createCharacter = (characterClass: CharacterClass): Character => {
    return CHARACTER_CLASS_LIST_MAP[characterClass]
}

const joinBattleRoom = (player: Player): BattleRoom => {
    if (battleRoom.isFull) {
        throw new Error("BattleRoom 滿了 !!")
    }

    battleRoom.players.push(player)

    battleRoom.status = battleRoom.isFull ? BattleStatus.ReadyToStart : BattleStatus.WaitingForPlayers

    return battleRoom
}

const leaveBattleRoom = (userInfo: UserInfo): BattleRoom => {
    battleRoom.players = battleRoom.players.filter((player) => player.userinfo.id !== userInfo.id)
    battleRoom.status = battleRoom.isFull ? BattleStatus.ReadyToStart : BattleStatus.WaitingForPlayers

    return battleRoom
}

const createPlayer = (userInfo: UserInfo, character: Character): Player => {
    const playerStats: PlayerStats = {
        ...BASE_PLAYER_STATS, // 首先將 basePlayerStats 作為初始值
        ...Object.entries(character.stats).reduce(
            (acc, [key, value]) => {
                const base = BASE_PLAYER_STATS[key as keyof typeof BASE_PLAYER_STATS] // 根據 key 從 basePlayerStats 中獲取對應的基礎值
                acc[key as keyof typeof BASE_PLAYER_STATS] = base + (value ?? 0) // 計算最終的屬性值（如果 value 是 undefined，則使用 0）
                return acc
            },
            {} as typeof BASE_PLAYER_STATS
        ),
    }

    return {
        character,
        userinfo: userInfo,
        stats: playerStats,
        buffs: [],
        selectedAction: undefined,
        ready: false,
    }
}

const readyPlayer = (userInfo: UserInfo) => {
    const currentUser = battleRoom.players.find((player) => player.userinfo.id === userInfo.id)

    if (currentUser) {
        currentUser.ready = !currentUser.ready
    }

    if (battleRoom.players.filter((player) => player.ready).length === MAX_BATTLE_ROOM_PEOPLE) {
        battleRoom.status = BattleStatus.Started
    }

    return battleRoom
}

export default {
    selectBattleRoom,
    initBattleRoom,
    createCharacter,
    createPlayer,
    joinBattleRoom,
    leaveBattleRoom,
    isReady,
    readyPlayer,
}
