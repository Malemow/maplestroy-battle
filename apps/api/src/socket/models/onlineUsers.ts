import type { OnlineUser } from "@repo/types/OnlineList"
import type { UserInfo } from "@repo/types/User"

const onlineUsers: OnlineUser = {}

const selectOnlineUsers = (): OnlineUser => {
    return onlineUsers
}

const insertOnlineUser = (userInfo: UserInfo): void => {
    onlineUsers[userInfo.id] = userInfo.name
}

const removeOnlineUser = (userInfo: UserInfo): boolean => delete onlineUsers[userInfo.id]

export default {
    selectOnlineUsers,
    insertOnlineUser,
    removeOnlineUser,
}
