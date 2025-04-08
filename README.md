# MapleStory Battle 小遊戲

這是一個為 **琉德** **Sk兔** 設計的遊戲，提供一個富有挑戰性和互動性的遊戲體驗。

## 技術棧

這個小遊戲是使用以下技術堆疊開發的：

- **Frontend**: React (Vite)
- **Backend**: Node (Express)
- **Real-time Communication**: Socket.IO
- **Game Logic**: TypeScript
- **Build System**: TurboRepo (多包管理)

## 遊戲介紹

遊戲以 **MapleStory** 的角色為基礎，提供一個回合制戰鬥系統，玩家可以選擇不同的技能來進行攻擊、技能、防禦、迴避等操作。

並且擁有聊天室可聊天。

## 功能特點

- **單房對戰**：同時間只能有一場對戰模式，使用 Socket.IO 進行玩家間的即時數據同步。
- **回合制戰鬥**：每個回合玩家可以選擇攻擊、技能、防禦、迴避等操作。
- **動畫效果**：使用 `framer-motion` 動畫庫來實現角色技能和攻擊的動畫效果，讓遊戲更加生動。
- **角色技能**：每個角色擁有不同的技能樹，玩家可以根據戰況選擇適合的技能進行戰鬥。

## 開發與設置

### 前端

本遊戲的前端是基於 React 和 Vite 架構，並使用 TypeScript 開發。Vite 提供快速的開發體驗，並且支持即時熱重載。

### 後端

後端使用 Node.js 和 Express 建立，提供遊戲的 API 和用戶認證系統。遊戲邏輯和即時對戰則是通過 Socket.IO 完成的，即時同步玩家的動作。

### TurboRepo

使用 TurboRepo 來管理多個包和專案共用 Types，保持前後端的整潔與高效。這讓開發、構建和測試流程更加快速。

## 安裝與運行

1. 克隆專案：

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. 安裝依賴：

   使用 `pnpm` 來安裝依賴：

    ```bash
    pnpm install
    ```

3. 啟動開發模式：
    pnpm run dev

4. 訪問遊戲界面：

   打開瀏覽器並訪問 `http://localhost:3000` 開始遊戲。

## 貢獻

如果你有任何改進建議或發現問題，歡迎提交 Issue 或 Pull Request。

## 授權

這個專案使用 MIT 授權條款，詳情請見 [LICENSE](./LICENSE) 文件。
