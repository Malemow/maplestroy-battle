import type { SessionData } from "express-session"
import { UserInfo } from "@repo/types/User"
import { sessionModel } from "@/models"
import type { Store } from "express-session"

const isLogin = (session: SessionData): boolean => {
    const userInfo = sessionModel.selectUserInfo(session)
    return !!userInfo
}

const getAllSession = async (store: Store) => {
    return await sessionModel.getAllSessions(store)
}

const getUserInfo = (session: SessionData): UserInfo | undefined => {
    return sessionModel.selectUserInfo(session)
}

const createAndSaveUserInfo = (session: SessionData, name?: string): UserInfo => {
    if (!name) {
        throw new Error("名稱為必填欄位！")
    }

    if (name.length < 2) {
        throw new Error("名稱太短了！至少要 2 個字！")
    }

    if (name.length > 12) {
        throw new Error("名稱太長了！最多只能 12 個字！")
    }

    return sessionModel.insertUserInfo(session, name)
}

const removeUserInfo = (session: SessionData): boolean => sessionModel.deleteUserInfo(session)

export default {
    isLogin,
    getUserInfo,
    createAndSaveUserInfo,
    removeUserInfo,
    getAllSession,
}
