import { useEffect, useState } from "react";

export function Day2() {
  const [input, setInput] = useState([]);
  const [games, setGames] = useState([]);
  const [validScore, setValidScore] = useState(0);

  useEffect(() => {
    fetch("./puzzle2.txt")
      .then((res) => res.text())
      .then((data) => {
        const lines = data.split("\n").map((line) => line.trim());
        setInput(lines);
      });
  }, []);

  function splitGames() {
    const allGames = input.map((games) =>
      games
        .split(";")
        .map((game) => game.split(":").map((match) => match.split(",")))
    );
    setGames(allGames);
  }

  useEffect(() => {
    let value = 0;
    let validCheck = true;

    games.forEach((game, index) => {
      validCheck = true;
      game.forEach((match) => {
        const trimmedMatch = match.join(",").trim();

        if (
          trimmedMatch.includes("blue") ||
          trimmedMatch.includes("red") ||
          trimmedMatch.includes("green")
        ) {
          let blueNumber = trimmedMatch.match(/(\d+)\s*blue/);
          let redNumber = trimmedMatch.match(/(\d+)\s*red/);
          let greenNumber = trimmedMatch.match(/(\d+)\s*green/);

          if (blueNumber && +blueNumber[1] > 14) {
            return (validCheck = false);
          }

          if (redNumber && +redNumber[1] > 12) {
            return (validCheck = false);
          }

          if (greenNumber && +greenNumber[1] > 13) {
            return (validCheck = false);
          }
        }
      });

      if (validCheck === true) {
        value += index + 1;
        setValidScore(value);
      }
    });

    console.log("This is the validscore :" + validScore);
  }, [games, validScore]);

  return (
    <>
      <button onClick={splitGames}>Split Games</button>
    </>
  );
}
