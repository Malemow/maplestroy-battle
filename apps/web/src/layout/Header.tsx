import { useState } from "react"
import { IoIosLogOut } from "react-icons/io"
import { useUserStore } from "@/store/userStore.ts"
import { useSocketStore } from "@/store/socketStore.ts"
import { useSocketBattleStore } from "@/store/socketBattleStore.ts"

const LoginOut = () => {
    const resetUserInfo = useUserStore((state) => state.resetUserInfo)
    const [loading, setLoading] = useState(false)
    const closeSocket = useSocketStore((state) => state.closeSocket)
    const closeBattleSocket = useSocketBattleStore((state) => state.closeSocket)

    const handleLogout = () => {
        setLoading(true)
        fetch(`/api/user`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    closeSocket()
                    closeBattleSocket()
                    resetUserInfo()
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <button
            className="btn btn-ghost hover:btn-error"
            onClick={handleLogout}
            disabled={loading}
        >
            登出
            <IoIosLogOut className="text-2xl" />
        </button>
    )
}

export const Header = () => {
    return (
        <header className="navbar bg-gradient-to-r from-pink-300 to-red-300 text-white shadow-sm">
            <div className="flex-1">
                <h1 className="text-2xl font-bold">
                    <b className="mr-2 text-4xl">Sk兔</b>
                    <i>MapleStory Battle Game</i>
                </h1>
            </div>
            <div className="flex-none">
                <LoginOut />
            </div>
        </header>
    )
}
