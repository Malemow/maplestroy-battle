export const CLIENT_DEFAULT_PORT = 3000;
export const SERVER_DEFAULT_PORT = 5000;
export const DEFAULT_SECRET = "MapleStoryBattle"
export const CHAT_ROOM_MAX_MESSAGES = 100;

export * from "./battle"

export const SocketEvents = {
    BattleRoom: "battleRoom",
    GetBattleRoom: "getBattleRoom",
    OnlineList: "onlineList",
    ChatRoomMessage: "chatRoomMessage",
} as const

export type SocketEventName = (typeof SocketEvents)[keyof typeof SocketEvents]
