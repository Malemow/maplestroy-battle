import { SocketEventName } from "@repo/constant"

type SocketResponse<T> = {
    success: boolean
    data?: T
    error?: string
}

export const handleSocketResponse = <T>(
    eventName: SocketEventName,
    onSuccess: (data: T) => void
): [SocketEventName, (res: SocketResponse<T>) => void | T] => {
    const response = (res: SocketResponse<T>) => {
        if (!res.success) {
            console.error(`[Socket Error][${eventName}]`, res.error)
            return
        }
        if (res.data !== undefined) {
            onSuccess(res.data)
        }
    }

    return [eventName, response]
}
