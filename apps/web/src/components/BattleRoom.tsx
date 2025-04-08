import { useState } from "react"
import { useUserStore } from "@/store/userStore"
import { useSocketBattleStore } from "@/store/socketBattleStore"
import { useBattleRoomMessageList } from "@/hooks/useBattleRoomMessageList"
import * as BattleType from "@repo/types/Battle"
import { BattleStatus, CharacterClass, type CharacterClassOptions } from "@repo/types/Battle"
import type { UserInfo } from "@repo/types/User"
import { CHARACTER_CLASS_OPTIONS, MAX_BATTLE_ROOM_PEOPLE } from "@repo/constant/battle.ts"
import clsx from "clsx"

const JoinGame = () => {
    const joinBattleRoom = useSocketBattleStore((state) => state.joinBattleRoom)
    const [characterClass, setCharacterClass] = useState<CharacterClass>(CharacterClass.Warrior)

    return (
        <>
            <select
                defaultValue={characterClass}
                className="select"
                onChange={(e) => setCharacterClass(e.target.value as CharacterClass)}
            >
                {CHARACTER_CLASS_OPTIONS.map((option) => (
                    <option
                        value={option.value}
                        title={option.description}
                        key={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <button
                onClick={() => joinBattleRoom(characterClass)}
                className="btn btn-primary"
            >
                加入遊戲
            </button>
        </>
    )
}

const getCharacterClassOption = (characterClass: CharacterClass): CharacterClassOptions | undefined => {
    return CHARACTER_CLASS_OPTIONS.find((option) => option.value === characterClass)
}

const WaitGame = ({ currentPlayer }: { currentPlayer: BattleType.Player }) => {
    const leaveBattleRoom = useSocketBattleStore((state) => state.leaveBattleRoom)

    return (
        <>
            <span className="text-gray-300">
                你選擇了
                <b className="text-warning mx-1">{getCharacterClassOption(currentPlayer.character.id)!.label}</b>
                等待下一位遊戲玩家
            </span>
            <span className="loading loading-dots loading-sm text-gray-400" />
            <button
                className="btn btn-sm btn-error"
                onClick={() => leaveBattleRoom()}
            >
                退出
            </button>
        </>
    )
}

const ReadyRoom = ({ players, userInfo }: { players: BattleType.BattleRoom["players"]; userInfo: UserInfo }) => {
    const readyBattleRoom = useSocketBattleStore((state) => state.readyBattleRoom)
    const currentPlayer = players.find((player) => player.userinfo.id === userInfo.id)

    return (
        <>
            {currentPlayer ? (
                <div className="m-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="text-white">
                            你選擇了
                            <b className="text-warning mx-1">
                                {
                                    CHARACTER_CLASS_OPTIONS.find(
                                        (option) => option.value === currentPlayer.character.id
                                    )!.label
                                }
                            </b>
                        </p>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => readyBattleRoom()}
                        >
                            {currentPlayer.ready ? "取消準備" : "準備"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
                    <span className="text-white">等待玩家準備</span>
                    <span className="loading loading-dots loading-sm text-gray-400" />
                </div>
            )}
            <div className="text-md absolute right-2 bottom-2 flex flex-col">
                {players.map((player) => (
                    <p className={clsx(player.ready ? "text-success font-bold" : "text-gray-500")}>
                        {player.userinfo.name}
                        <b className={clsx("mx-2", player.ready ? "text-success" : "text-warning")}>
                            ( {getCharacterClassOption(player.character.id)!.label} )
                        </b>
                    </p>
                ))}
            </div>
        </>
    )
}

const WaitRoom = ({ players, userInfo }: { players: BattleType.BattleRoom["players"]; userInfo: UserInfo }) => {
    const currentPlayer = players.find((player) => player.userinfo.id === userInfo.id)

    return (
        <>
            <h3 className="text-center text-lg font-bold text-white">
                房間人數: {players.length} / {MAX_BATTLE_ROOM_PEOPLE}
            </h3>
            <main className="m-auto flex gap-2 p-2">
                {currentPlayer ? <WaitGame currentPlayer={currentPlayer} /> : <JoinGame />}
            </main>
            <footer className="absolute right-2 bottom-2 flex flex-col">
                {players.map((player) => (
                    <p
                        className="text-end text-lg text-white"
                        key={player.userinfo.id}
                    >
                        <b className="text-warning font-bold">{player.userinfo.name}</b> 正在等待有人加入戰鬥
                    </p>
                ))}
            </footer>
        </>
    )
}

const RunningBattle = () => {
    return <div>Running</div>
}

const Battle = ({ battleRoom }: { battleRoom: BattleType.BattleRoom }) => {
    const userInfo = useUserStore((state) => state.userInfo)

    const ReadWaitRoom = (
        <div className="relative flex h-full w-full flex-col bg-gray-600 p-2">
            {battleRoom.status === BattleStatus.ReadyToStart ? (
                <ReadyRoom
                    players={battleRoom.players}
                    userInfo={userInfo!}
                />
            ) : (
                <WaitRoom
                    players={battleRoom.players}
                    userInfo={userInfo!}
                />
            )}
        </div>
    )

    return (
        <div className="h-full w-full">
            {battleRoom.status >= BattleStatus.Started ? <RunningBattle /> : ReadWaitRoom}
        </div>
    )
}

export const BattleRoom = () => {
    useBattleRoomMessageList()
    const battleRoom = useSocketBattleStore((state) => state.battleRoom)

    return <div className="h-full w-full">{battleRoom && <Battle battleRoom={battleRoom} />}</div>
}
