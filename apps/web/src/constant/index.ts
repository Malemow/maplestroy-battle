import { SERVER_DEFAULT_PORT, CLIENT_DEFAULT_PORT } from "@repo/constant"

export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || SERVER_DEFAULT_PORT
export const CLIENT_PORT = import.meta.env.VITE_CLIENT_PORT || CLIENT_DEFAULT_PORT
