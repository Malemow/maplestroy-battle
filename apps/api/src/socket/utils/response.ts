import { Server } from "socket.io"
import type { SocketEventName } from "@Repo/constant"

export const sendResponse = <T>(socket: Server, event: SocketEventName, data: T | null, error?: string) => {
    if (error) {
        socket.emit(event, { success: false, error })
    } else {
        socket.emit(event, { success: true, data })
    }
}
