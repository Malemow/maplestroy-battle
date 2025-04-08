import { UserInfo } from "./User";
import { Dayjs } from "@repo/lib/dayjs"

export enum BattleStatus {
    WaitingForPlayers, // 房間未滿
    ReadyToStart,      // 等待開始
    Started,           // 開始
    WaitingForActions, // 等待出招
    InProgress,        // 進行中
    Finished,          // 結束
}

// 玩家屬性
export interface PlayerStats {
    maxHp: number       // 最大生命值
    hp: number          // 當前生命值
    maxSp: number       // 最大技能點（SP）
    sp: number          // 當前技能點（SP）
    attack: number      // 攻擊力
    defense: number     // 防禦力
    evasion: number     // 閃避率
    accuracy: number    // 命中率
}

// Buff 狀態
export interface Buff {
    id: string          // Buff 的唯一識別碼
    name: string        // Buff 名稱
    duration: number    // 持續回合數
    effect: string      // Buff 效果描述（可改為具體型別）
}

// 技能資料
export interface Skill {
    id: string          // 技能的唯一識別碼
    name: string        // 技能名稱
    cost: number        // 技能消耗的 SP 數量
    description: string // 技能說明文字
    // 可以擴充：effect（效果）、type（技能類型）、target（目標對象）等欄位
}

export enum CharacterClass {
    Warrior = "Warrior",  // 劍士
    Archer = "Archer",    // 弓箭手
    Thief = "Thief",      // 盜賊
    Mage = "Mage",        // 法師
}

// 行動類型
export enum ActionType {
    Attack, // 普通攻擊
    Skill,  // 使用技能
    Defend, // 防禦
    Evade,  // 閃避
    Rest    // 休息恢復
}

// 玩家行動
export interface PlayerAction {
    type: ActionType     // 行動類型
    skillId?: string     // 若使用技能，指定技能 ID
    targetId: string     // 行動目標的玩家 ID
}

// 玩家資料
export interface Player {
    character: Character
    ready: boolean
    userinfo: UserInfo            // 玩家個人資訊
    stats: PlayerStats            // 玩家數值資料
    buffs: Buff[]                 // 玩家目前身上的 Buff 狀態
    selectedAction?: PlayerAction // 當前回合選擇的行動（可為 undefined，代表尚未選擇）
}

// 對戰房間資料
export interface BattleRoom {
    id: string            // 房間唯一識別碼
    players: Player[]     // 房間內的所有玩家（2 位）
    round: number         // 當前進行到第幾回合
    createdAt: Dayjs      // 房間創建時間（使用 Dayjs 套件）
    status: BattleStatus  // 對戰狀態
    statusChangeAt: Dayjs // 狀態更新的時間
}

export interface Character {
    id: CharacterClass,
    stats: Partial<PlayerStats>
    skills: Skill[]
}

export interface CharacterClassOptions {
    label: string,
    value: CharacterClass,
    description?: string
}
