import {Character, CharacterClass, CharacterClassOptions, PlayerStats} from "@repo/types/Battle"

export const MAX_BATTLE_ROOM_PEOPLE = 2

export const CHARACTER_CLASS_OPTIONS: CharacterClassOptions[] = [
    { label: "戰士 Warrior", value: CharacterClass.Warrior },
    { label: "弓箭手 Archer", value: CharacterClass.Archer },
    { label: "盜賊 Thief", value: CharacterClass.Thief },
    { label: "法師 Mage", value: CharacterClass.Mage },
]

export const BASE_PLAYER_STATS: PlayerStats = {
    maxHp: 100,
    hp: 100,
    maxSp: 50,
    sp: 50,
    attack: 10,
    defense: 10,
    evasion: 10,
    accuracy: 10,
}

const CHARACTER_CLASS_LIST: Character[] = [
    {
        id: CharacterClass.Warrior,
        stats: {
            maxHp: 20,
            attack: 10,
            defense: 5,
            maxSp: -20,
        },
        skills: [
            {
                id: "power-slash",
                name: "Power Slash",
                cost: 5,
                description: "對敵人造成強力近戰攻擊",
            },
        ],
    },
    {
        id: CharacterClass.Archer,
        stats: {
            maxHp: -20,
            attack: 5,
            evasion: 2,
            accuracy: 8,
        },
        skills: [
            {
                id: "arrow-rain",
                name: "Arrow Rain",
                cost: 10,
                description: "向全體敵人射出箭雨，造成範圍傷害",
            },
        ],
    },
    {
        id: CharacterClass.Thief,
        stats: {
            maxHp: -10,
            attack: 7,
            evasion: 10,
            accuracy: 5,
        },
        skills: [
            {
                id: "backstab",
                name: "Backstab",
                cost: 8,
                description: "從背後突襲敵人，造成高額爆擊傷害",
            },
        ],
    },
    {
        id: CharacterClass.Mage,
        stats: {
            maxHp: -30,
            maxSp: 10,
            attack: 15,
            defense: -5,
            accuracy: 10,
        },
        skills: [
            {
                id: "fireball",
                name: "Fireball",
                cost: 15,
                description: "投出火球對單體敵人造成魔法傷害",
            },
            {
                id: "arcane-shield",
                name: "Arcane Shield",
                cost: 10,
                description: "召喚魔法護盾，提高自身防禦 2 回合",
            },
        ],
    }
]

export const CHARACTER_CLASS_LIST_MAP: Record<CharacterClass, Character> = CHARACTER_CLASS_LIST.reduce(
    (acc, character) => {
        acc[character.id] = character;
        return acc;
    },
    {} as Record<CharacterClass, Character>
);
