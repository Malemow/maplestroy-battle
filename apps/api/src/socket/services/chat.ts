import type { UserInfo } from "@repo/types/User"
import { ChatRoomMessage, ChatRoomMessageStatus } from "@repo/types/ChatRoomMessage"
import dayjs from "@repo/lib/dayjs"
import { onlineUserModel } from "socket/models"
import type { OnlineUser } from "@repo/types/OnlineList"
import type { SessionData } from "express-session"
import { userService } from "services"

const _createMessage = (userInfo: UserInfo, status: ChatRoomMessageStatus, message?: string): ChatRoomMessage => {
    switch (status) {
        case ChatRoomMessageStatus.JOIN: {
            message = "加入聊天室"
            break
        }
        case ChatRoomMessageStatus.DISCONNECTED: {
            message = "離開聊天室"
            break
        }
        case ChatRoomMessageStatus.MESSAGE:
        default: {
            if (!message) {
                message = "發生未知錯誤"
            }
            break
        }
    }

    return {
        userInfo,
        status: ChatRoomMessageStatus.JOIN,
        message,
        createdAt: dayjs(),
    }
}

const createMessage = {
    join: (userInfo: UserInfo) => _createMessage(userInfo, ChatRoomMessageStatus.JOIN),
    leave: (userInfo: UserInfo) => _createMessage(userInfo, ChatRoomMessageStatus.DISCONNECTED),
    send: (userInfo: UserInfo, message: string) => _createMessage(userInfo, ChatRoomMessageStatus.MESSAGE, message),
}

const getOnlineUsers = (): OnlineUser => onlineUserModel.selectOnlineUsers()
const addOnlineUsers = (userInfo: UserInfo): void => onlineUserModel.insertOnlineUser(userInfo)
const deleteOnlineUsers = (userInfo: UserInfo): boolean => onlineUserModel.removeOnlineUser(userInfo)
const getUserInfo = (session: SessionData): UserInfo => userService.getUserInfo(session)!

export default {
    createMessage,
    getOnlineUsers,
    addOnlineUsers,
    deleteOnlineUsers,
    getUserInfo,
}
