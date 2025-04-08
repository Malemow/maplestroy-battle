import { create } from "zustand"
import type { UserInfo } from "@repo/types/User"

type UserStory = {
    userInfo?: UserInfo
    setUserInfo: (userInfo: UserInfo) => void
    resetUserInfo: () => void
}

export const useUserStore = create<UserStory>((set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
    resetUserInfo: () => set({ userInfo: undefined }),
}))
