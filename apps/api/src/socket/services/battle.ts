import { battleModel } from "socket/models"
import type { BattleRoom } from "@/types/battle"
import type { UserInfo } from "@repo/types/User"
import { CharacterClass } from "@repo/types/Battle"
import { logger } from "@/libs/logger"

const getBattleRoom = (): BattleRoom => {
    return battleModel.selectBattleRoom()
}

const joinBattleRoom = (userInfo: UserInfo, characterClass: CharacterClass): BattleRoom => {
    const character = battleModel.createCharacter(characterClass)
    const player = battleModel.createPlayer(userInfo, character)

    try {
        return battleModel.joinBattleRoom(player)
    } catch (error) {
        logger.error(error)
    }

    return battleModel.selectBattleRoom()
}

const leaveBattleRoom = (userInfo: UserInfo): BattleRoom => {
    if (battleModel.isReady()) {
        return battleModel.leaveBattleRoom(userInfo)
    } else {
        return battleModel.initBattleRoom()
    }
}

const readyPlayer = (userInfo: UserInfo): BattleRoom => {
    return battleModel.readyPlayer(userInfo)
}

export default {
    readyPlayer,
    getBattleRoom,
    joinBattleRoom,
    leaveBattleRoom,
}
