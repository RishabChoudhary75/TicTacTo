import { useState } from "react";

function App() {
  const [Box, SetBox] = useState(Array(9).fill(null));
  const [IsXNext, SetIsXNext] = useState(true);
  const [History, SetHistory] = useState([]);
  const handelval = (index) => {
    const NBox = Box.slice();
    NBox[index] = IsXNext ? "X" : "O"; // place the symbool
    SetBox(NBox);
    SetIsXNext(!IsXNext); // change false for 0
    SetHistory([
      ...History,
      { Box: NBox, player: IsXNext ? "X" : "O", moveIn: index },
    ]);
  };
  const cleardata = () => {
    SetBox(Array(9).fill(null));
    SetIsXNext(true);
    SetHistory([]);
  };
  // calculate winner
  const Calculatewinner = (Box) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (Box[a] && Box[a] === Box[b] && Box[a] === Box[c]) {
        return Box[a]; // Return winning player x or 0
      }
    }
    return null;
  };
  const winner = Calculatewinner(Box);
  const jumpTo = (move) => {
    // Set the board state to that of the selected move
    SetBox(History[move].Box);
    SetIsXNext(move % 2 === 0); // Toggle player based on the move
  };
  return (
    <>
      <div className="flex gap-2 justify-center items-center h-screen relative bg-red-300  ">
        <h1 className="absolute top-[26%]">
          {winner ? (
            <h1>Player {winner} Wins</h1>
          ) : (
            <h1 className="font-bold ">Next Player: {IsXNext ? "X" : "O"}</h1>
          )}
        </h1>

        <div className="size-56  grid grid-cols-3 gap-1 border-2 border-slate-500 ">
          {Box.map((val, index) => (
            <button
              key={index}
              className="bg-gray-400"
              onClick={() => handelval(index)}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="size-56 ">
          <button
            className=" border-2 border-slate-500 px-4 bg-slate-400 w-full"
            onClick={cleardata}
          >
            Resat
          </button>
          {History.map((val, index) => (
            <button
              key={index}
              className="bg-slate-300 mt-1 border-2 border-slate-500 w-full"
              onClick={() => jumpTo(index)}
            >
              player:{val.player} , Bno:{val.moveIn}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
