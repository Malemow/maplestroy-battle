import type { SessionData } from "express-session"
import type { UserInfo } from "@repo/types/User"
import { nanoid } from "nanoid"
import type { Store } from "express-session"

const selectUserInfo = (session: SessionData) => {
    return session.userInfo
}

const insertUserInfo = (session: SessionData, name: string): UserInfo => {
    const userInfo: UserInfo = {
        name,
        id: nanoid(),
    }
    session.userInfo = userInfo

    return userInfo
}

const deleteUserInfo = (session: SessionData): boolean => delete session.userInfo

function getAllSessions(store: Store): Promise<Record<string, SessionData>> {
    return new Promise((resolve, reject) => {
        store.all!((err, sessions) => {
            if (err) reject(err)
            else resolve(sessions as Record<string, SessionData>)
        })
    })
}

export default {
    selectUserInfo,
    insertUserInfo,
    deleteUserInfo,
    getAllSessions,
}
