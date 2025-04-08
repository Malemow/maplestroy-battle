import { BattleRoom } from "@/components/BattleRoom.tsx"
import { ChatRoom } from "@/components/ChatRoom.tsx"
import { useEffect, useState } from "react"
import { useUserStore } from "@/store/userStore.ts"
import { CreateAccount } from "@/components/CreateAccount.tsx"
import type { UserInfo } from "@repo/types/User"
import { Header, Footer } from "@/layout"

export const App = () => {
    const [loading, setLoading] = useState(true)
    const userInfo = useUserStore((state) => state.userInfo)
    const setUserInfo = useUserStore((state) => state.setUserInfo)

    useEffect(() => {
        fetch("/api/user", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data: UserInfo) => {
                setUserInfo(data)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [setUserInfo])

    if (loading) {
        return <div>Loading...</div> // 可以顯示一個 loading 狀態
    }

    return <>{userInfo ? <Root /> : <CreateAccount />}</>
}

const Root = () => {
    return (
        <div className="grid min-h-screen grid-rows-[auto_minmax(500px,1fr)_auto] bg-gray-100 lg:max-h-screen">
            <Header />
            <main className="grid grid-cols-1 grid-rows-[minmax(500px,1fr)_400px] gap-2 p-2 lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-1">
                <BattleRoom />
                <ChatRoom />
            </main>
            <Footer />
        </div>
    )
}

export default App
