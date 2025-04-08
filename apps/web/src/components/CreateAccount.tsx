import { useState, useRef } from "react"
import { useUserStore } from "@/store/userStore"
import { UserInfo } from "@repo/types/User"
import { useSocketStore } from "@/store/socketStore"
import { useSocketBattleStore } from "@/store/socketBattleStore"

export const CreateAccount = () => {
    const setUserInfo = useUserStore((state) => state.setUserInfo)
    const resetSocket = useSocketStore((state) => state.resetSocket)
    const initChatRoomMessageList = useSocketStore((state) => state.initChatRoomMessageList)
    const resetBattleSocket = useSocketBattleStore((state) => state.resetSocket)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        inputRef!.current?.setCustomValidity("")
        setName(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ name: name.trim() }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 400) {
                    const errorText = await response.text()

                    inputRef!.current?.setCustomValidity(errorText)
                    inputRef!.current?.reportValidity()

                    setError(errorText)
                }
            })
            .then((data: UserInfo) => {
                initChatRoomMessageList()
                setUserInfo(data)
                resetSocket()
                resetBattleSocket()
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="flex h-dvh w-dvw bg-gray-600">
            <div className="m-auto flex flex-col items-center justify-center gap-4 rounded-2xl p-4 shadow-2xl">
                <h1 className="text-center text-2xl font-bold text-neutral-400">🍁Sk兔 楓之谷戰鬥遊戲🚀</h1>
                <form
                    className="flex h-full w-full flex-col gap-4"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div>
                        <label className="input validator">
                            <input
                                ref={inputRef}
                                type="input"
                                onChange={handleChange}
                                value={name}
                                name="name"
                                placeholder="歡迎遊玩請填寫角色名稱"
                                required
                                minLength={2}
                                maxLength={12}
                            />
                        </label>
                        <p className="validator-hint">{error ? error : "必須在 2 到 12 個字"}</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn w-full"
                            disabled={loading}
                        >
                            加入遊戲大廳
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
