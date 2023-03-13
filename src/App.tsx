import React, { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import GoalBoard from "./components/GoalBoard";
import { dataImg } from "./data";

export interface CardInterface {
  id: number;
  src: string;
  value: number;
  match: boolean;
}

const TIMEOUT = 60;

function App() {
  const [turn, setTurn] = useState(0);
  const [cards, setCards] = useState<CardInterface[] | []>([]);
  const [choiceOne, setChoiceOne] = useState<number | null>();
  const [choiceTwo, setChoiceTwo] = useState<number | null>();
  const [disable, setDisable] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [goalBoard, setGoalBoard] = useState<number[] | []>([]);
  const [time, setTime] = useState<number>(TIMEOUT);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetGame = () => {
    const newCards = [...dataImg, ...dataImg]
      .sort(() => 0.5 - Math.random())
      .map((item, index) => ({ ...item, id: index + 1 }));

    setTurn(0);
    setCompleted(false);
    setCards(newCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisable(true);
  };

  const handleChoice = (id: number) => {
    choiceOne ? setChoiceTwo(id) : setChoiceOne(id);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisable(false);
  };

  const clearInt = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const startGame = () => {
    resetGame();
    setDisable(false);

    clearInt();
    setTime(TIMEOUT);

    intervalId.current = setInterval(() => {
      setTime((oldV) => {
        if (oldV === 0) {
          setDisable(true);
          clearInt();
          return 0;
        }
        return oldV - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const choiceOneValue = cards.find((item) => item.id === choiceOne)?.value;
    const choiceTwoValue = cards.find((item) => item.id === choiceTwo)?.value;

    if (choiceOne && choiceTwo) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const isNotCompleted = cards.some((item) => !item.match); //checked users complete the game or not

    if (!isNotCompleted) {
      setGoalBoard([...goalBoard, turn]);
      setCompleted(true);
      clearInt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="bg-[#333] min-h-[100vh]">
      <div className="container mx-auto py-5">
        <h1 className="text-white text-center w-full text-3xl">Memory Game</h1>
        <div className="w-[150px] h-10 mx-auto my-3 text-white border border-white rounded-md duration-500 hover:scale-105">
          <button className="w-full h-full " onClick={startGame}>
            {completed ? "Restart" : "Start"}
          </button>
        </div>
        <div className="flex justify-around text-white text-center">
          <p>Turn: {turn}</p>
          <p>Time: {time}</p>
        </div>
        <div className="flex justify-center gap-5">
          <div>
            {completed ? (
              <div className=" mt-32  text-4xl text-green-500 animate-bounce text-center">
                Congratulation! You finished in {turn} turns and
                {TIMEOUT - time}s
              </div>
            ) : (
              <div className="flex">
                <div className="grid grid-cols-4 gap-5 w-[800px] mx-auto mt-5">
                  {cards.map((item) => (
                    <Card
                      key={item.id}
                      item={item}
                      handleChoice={handleChoice}
                      matched={
                        item.match || [choiceOne, choiceTwo].includes(item.id)
                      }
                      disable={
                        disable || [choiceOne, choiceTwo].includes(item.id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <GoalBoard goalBoard={goalBoard} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
