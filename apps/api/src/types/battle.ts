import * as BattleType from "@repo/types/Battle"

export interface BattleRoom extends BattleType.BattleRoom {
    _status: BattleType.BattleStatus
    isFull: boolean
}
