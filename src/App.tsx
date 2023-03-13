import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { dataImg } from "./data";

interface PropsData {
  id: number;
  src: string;
  value: number;
  match: boolean;
}

function App() {
  const [turn, setTurn] = useState(0);
  const [cards, setCards] = useState<PropsData[] | []>([]);
  const [choiceOne, setChoiceOne] = useState<number | null>();
  const [choiceTwo, setChoiceTwo] = useState<number | null>();
  const [disable, setDisable] = useState(false);

  const handleStart = () => {
    const newDataImg = [...dataImg, ...dataImg]
      .sort(() => {
        return 0.5 - Math.random();
      })
      .map((item) => {
        return { ...item, id: Math.random() };
      });

    setTurn(0);
    setCards(newDataImg);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (id: number) => {
    choiceOne ? setChoiceTwo(id) : setChoiceOne(id);
  };
console.log(choiceOne);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisable(false);
  };

  const choiceOneValue = cards.find((item) => item.id === choiceOne)?.value;
  const choiceTwoValue = cards.find((item) => item.id === choiceTwo)?.value;
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne !== choiceTwo) {
        setDisable(true);
        if (choiceOneValue === choiceTwoValue) {
          setCards((prev) =>
            prev.map((card) => {
              if (card.value === choiceOneValue) {
                return { ...card, match: true };
              }
              return card;
            })
          );
          resetTurn();
        } else {
          setTimeout(() => {
            resetTurn();
          }, 1000);
        }
      }
    }
  }, [choiceOne, choiceTwo]);

  const completed = cards.every((item) => item.match === true); //checked users complete the game or not
  useEffect(() => {
    handleStart();
  }, []);

  return (
    <div className="bg-[#333] h-[100vh]">
      <div className="container mx-auto pt-5">
        <h1 className="text-white text-center w-full text-3xl">Memory Game</h1>
        <div className="w-[150px] h-10 mx-auto my-3 text-white border border-white rounded-md duration-500 hover:scale-105">
          <button className="w-full h-full " onClick={handleStart}>
            {completed ? "Restart" : "Start"}
          </button>
        </div>
        <p className="text-white text-center">Turn: {turn}</p>
        {completed ? (
          <div className=" mt-32  text-4xl text-green-500 animate-bounce text-center">
            Congratulation! You finished in {turn} turns
          </div>
        ) : (
          <div className="flex">
            <div className="grid grid-cols-4 gap-5 w-[800px] mx-auto mt-5">
              {cards.map((item) => {
                return (
                  <Card
                    key={item.id}
                    handleChoice={handleChoice}
                    matched={
                      item.id === choiceOne ||
                      item.id === choiceTwo ||
                      item.match
                    }
                    disable={disable}
                    src={item.src}
                    id={item.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
