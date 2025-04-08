import type { UserInfo } from "./User";
import type { Dayjs } from "@repo/lib/dayjs"

export enum ChatRoomMessageStatus {
    JOIN,
    MESSAGE,
    DISCONNECTED,
}

export type ChatRoomMessage = {
    userInfo: UserInfo
    status: ChatRoomMessageStatus
    message: string
    createdAt: Dayjs
}
