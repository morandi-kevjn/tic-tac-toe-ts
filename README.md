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

### React Concepts
- Separating UI components from logic using **Custom Hooks** (`useTicTacToe.ts`).
- Managing complex state arrays (History) and time-traveling through them.
- Using `useEffect` to sync state with Local Storage and trigger a computer opponent.
- Avoiding the "stale closure" trap using `useCallback`.
- Extracting pure helper functions into a `utils.ts` file.

### TypeScript Concepts
- Defining **Interfaces** for React component props (`SquareProps`, `BoardProps`).
- Creating **Type Aliases** for complex data structures (`GameHistory`, `BoardState`, `SquareValue`).
- Applying **Generics** to React hooks (`useState<GameHistory>`, `useCallback<...>`).
- Handling strict null checks (fixing `Type 'boolean | null' is not assignable to type 'boolean'`).
- Using **Type Guards** (e.g., `.filter((val): val is number => val !== null)`).