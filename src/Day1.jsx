import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("./puzzle.txt")
      .then((res) => res.text())
      .then((data) => {
        const lines = data.split(/\n/);
        setInput(lines);
      });
  }, []);

  useEffect(() => {
    const extractNumbers = input.map((line) => {
      const lineNumbers = line.match(/\d+/g) || [];
      return lineNumbers.map((number) => number.split("")).flat(1);
    });
    setNumbers(extractNumbers);
  }, [input]);

  function calculate() {
    console.log(numbers);
    const fileDownNumbers = numbers.map((number) => {
      const firstNumber = number[0];
      const lastNumber = number[number.length - 1];
      //String
      const addition = firstNumber + lastNumber;
      return addition;
    });
    setResult(fileDownNumbers);
  }

  function showNumber() {
    const final = result.reduce((acc, current) => {
      //convert to number
      return (acc = +acc + +current);
    });
    console.log(final);
  }

  return (
    <>
      <button onClick={calculate}>Click me</button>
      <button onClick={showNumber}>Click tell</button>
    </>
  );
}

export default App;
