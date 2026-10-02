# React Tic-Tac-Toe (TypeScript Edition) 🎮

A fully functional Tic-Tac-Toe game built with React, TypeScript, and Vite. This project was built to master React fundamentals, custom hooks, and type-safe development.

## ✨ Features
- **Classic Gameplay:** Play against a friend locally.
- **Time Travel:** Jump back to any previous move in the game history.
- **Computer AI:** Play against a simple random-move computer opponent.
- **Move History:** Detailed move log showing the exact row and column of every play.
- **Winning Highlight:** Visually highlights the three squares that secured the victory.
- **Persistence:** Automatically saves your game state to Local Storage so you can refresh the page without losing progress.
- **Sorting:** Toggle the move history between ascending and descending order.

## 🛠️ Tech Stack
- **React** (State, Effects, Custom Hooks)
- **TypeScript** (Interfaces, Type Aliases, Generics)
- **Vite** (Build tool)
- **CSS** (Grid & Flexbox)
- **Local Storage** (Browser API)

## 🚀 How to Run
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🧠 What I Learned

## 🧠 What I Learned

### React Concepts
- Separating UI components from logic using **Custom Hooks** (`useTicTacToe.ts`).
- **Global State Management:** Migrating from local component state to a global **Zustand** store to avoid prop drilling.
- **State Persistence:** Using Zustand's `persist` middleware to automatically save game state to Local Storage.
- Avoiding the "stale closure" trap using `useCallback` (pre-Zustand).
- Extracting pure helper functions into a `utils.ts` file.

### TypeScript Concepts
- Defining **Interfaces** for React component props (`SquareProps`, `BoardProps`).
- Defining **Interfaces for Global Stores** (`GameState`).
- Creating **Type Aliases** for complex data structures (`GameHistory`, `BoardState`, `SquareValue`).
- Applying **Generics** to React hooks (`useState<GameHistory>`) and Zustand (`create<GameState>()`).
- Handling strict null checks (fixing `Type 'boolean | null' is not assignable to type 'boolean'`).
- Using **Type Guards** (e.g., `.filter((val): val is number => val !== null)`).
- **Immutable Updates:** Safely updating nested arrays in the store without mutating original state.Immutable Updates:** Safely updating nested arrays in the store without mutating original state.