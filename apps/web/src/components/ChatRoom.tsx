import { FormEvent, useEffect, useState, useRef } from "react"
import { useSocketStore } from "@/store/socketStore.ts"
import { type ChatRoomMessage, ChatRoomMessageStatus } from "@repo/types/ChatRoomMessage"
import clsx from "clsx"
import { useUserStore } from "@/store/userStore.ts"
import type { Dayjs } from "@repo/lib/dayjs.ts"
import dayjs from "@repo/lib/dayjs.ts"
import { useOnlineList } from "@/hooks/useOnlineList.tsx"
import { useChatRoomMessageList } from "@/hooks/useChatRoomMessageList.tsx"
import { FaWifi, FaGithub } from "react-icons/fa"
import { IoBatteryCharging } from "react-icons/io5"

const IconGroup = () => {
    const ICON_SIZE_CLASSNAME = "text-lg"

    return (
        <div className="flex gap-3">
            <FaWifi className={ICON_SIZE_CLASSNAME} />
            <IoBatteryCharging className={ICON_SIZE_CLASSNAME} />
        </div>
    )
}

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(dayjs())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs())
        }, 1000) // 每秒刷新一次

        return () => clearInterval(interval)
    }, [])

    return <time className="font-bold">{currentTime.format("HH:mm")}</time>
}

const RelativeTime = ({ time }: { time: Dayjs }) => {
    const [relativeTime, setRelativeTime] = useState(dayjs(time).fromNow())

    useEffect(() => {
        const interval = setInterval(() => {
            setRelativeTime(dayjs(time).fromNow())
        }, 1000) // 每秒刷新一次

        return () => clearInterval(interval)
    }, [time])

    return <>{relativeTime}</>
}

const ChatRoomMessageItem = ({ chatRoomMessage }: { chatRoomMessage: ChatRoomMessage }) => {
    const userInfo = useUserStore((state) => state.userInfo)!
    let bubbleColor: "chat-bubble-neutral" | "chat-bubble-success" | "chat-bubble-error"

    switch (chatRoomMessage.status) {
        case ChatRoomMessageStatus.JOIN: {
            bubbleColor = "chat-bubble-success"
            break
        }
        case ChatRoomMessageStatus.DISCONNECTED: {
            bubbleColor = "chat-bubble-error"
            break
        }
        case ChatRoomMessageStatus.MESSAGE:
        default: {
            bubbleColor = "chat-bubble-neutral"
        }
    }

    return (
        <div className={clsx("chat", userInfo.id === chatRoomMessage.userInfo.id ? "chat-end" : "chat-start")}>
            <div className="chat-header">
                <span className="text-sm font-bold">{chatRoomMessage.userInfo.name}</span>
                <time className="text-xs opacity-50">{<RelativeTime time={chatRoomMessage.createdAt} />}</time>
            </div>
            <div className={clsx("chat-bubble", bubbleColor, "rounded-3xl")}>{chatRoomMessage.message}</div>
        </div>
    )
}

export const ChatRoom = () => {
    useChatRoomMessageList()
    useOnlineList()

    const chatRoomMessageList = useSocketStore((state) => state.chatRoomMessageList)
    const onlineList = useSocketStore((state) => state.onlineList)
    const sendChatMessage = useSocketStore((state) => state.sendChatMessage)
    const [inputMessage, setInputMessage] = useState<string>("")

    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatRoomMessageList])

    const handleSandMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputMessage.trim() === "") return

        sendChatMessage(inputMessage)
        setInputMessage("")
    }

    const handleOpenDialog = () => {
        const dialog = document.getElementById("online-list") as HTMLDialogElement

        dialog?.showModal()
    }

    return (
        <>
            <div className="mockup-phone w-full">
                <div className="mockup-phone-camera flex overflow-hidden">
                    <button
                        className="m-auto cursor-pointer text-center text-white"
                        onClick={() => handleOpenDialog()}
                    >
                        聊天室 {Object.keys(onlineList).length === 0 ? "" : Object.keys(onlineList).length}
                    </button>
                </div>
                <div className="mockup-phone-display h-full w-full bg-gray-100">
                    <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-4xl bg-white shadow-md">
                        <div className="flex h-12 items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <CurrentTime />
                                <a
                                    href="https://github.com/Malemow/maplestroy-battle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub className="text-lg" />
                                </a>
                            </div>
                            <div>
                                <IconGroup />
                            </div>
                        </div>
                        <div className="h-full space-y-2 overflow-auto p-3">
                            {chatRoomMessageList.map((chatRoomMessage, index) => (
                                <ChatRoomMessageItem
                                    key={index}
                                    chatRoomMessage={chatRoomMessage}
                                />
                            ))}
                            <div ref={bottomRef} />
                        </div>
                        <form
                            className="flex items-center gap-2 border-t border-gray-300 bg-gray-50 p-3 pb-4"
                            onSubmit={(e) => handleSandMessage(e)}
                        >
                            <label className="flex-1">
                                <input
                                    type="text"
                                    placeholder="輸入訊息..."
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                    required
                                    minLength={1}
                                    maxLength={128}
                                />
                            </label>
                            <button
                                type="submit"
                                className="hidden"
                            >
                                送出
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <dialog
                id="online-list"
                className="modal"
            >
                <div className="modal-box">
                    <ul className="list">
                        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                            線上人員 {Object.keys(onlineList).length}
                        </li>

                        {Object.entries(onlineList).map(([id, name]) => (
                            <li
                                className="list-row"
                                key={id}
                            >
                                <div>{name}</div>
                                <div className="text-xs font-semibold uppercase opacity-60">{id}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
