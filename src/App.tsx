import React, { useEffect, useRef, useState } from "react";

import Card from "./components/Card";
import GoalBoard from "./components/GoalBoard";
import { CardInterface } from "./card.type";

import { useAppSelector, useAppDispatch } from "./hooks";
import { changeMatchedCard, randomCard } from "./actions/cardAction";

const TIMEOUT = 2;

function App() {
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState<number | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<number | null>(null);
  const [disable, setDisable] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [goalBoard, setGoalBoard] = useState<number[]>([]);
  const [time, setTime] = useState<number>(TIMEOUT);

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const cards = useAppSelector((state) => state.card.card);
  const dispatch = useAppDispatch();

  const resetGame = () => {
    dispatch(randomCard());
    setTurn(0);
    setCompleted(false);
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
    const choiceOneValue = cards.find(
      (item: CardInterface) => item.id === choiceOne
    )?.value;
    const choiceTwoValue = cards.find(
      (item: CardInterface) => item.id === choiceTwo
    )?.value;

    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOneValue === choiceTwoValue) {
        dispatch(changeMatchedCard({ cards, choiceOneValue }));
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
    const isNotCompleted = cards.some((item: CardInterface) => !item.match); //checked users complete the game or not

    if (!isNotCompleted) {
      setGoalBoard([...goalBoard, turn]);
      setCompleted(true);
      clearInt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#333] min-h-[100vh]">
      <div className="container mx-auto py-5">
        <h1 className="text-white text-center w-full text-3xl">Memory Game</h1>
        <div className="w-[150px] h-10 mx-auto my-3 text-white border border-white rounded-md duration-500 hover:scale-105">
          <button className="w-full h-full " onClick={startGame}>
            {completed || time === 0 ? "Restart" : "Start"}
          </button>
        </div>
        <div className="flex justify-around text-white text-center">
          <p>Turn: {turn}</p>
          <p>Time: {time}</p>
        </div>
        <div className="relative flex justify-center gap-5">
          <div>
            {completed ? (
              <div className=" mt-32  text-4xl text-green-500 animate-bounce text-center">
                Congratulation! You finished in {turn} turns and{" "}
                {TIMEOUT - time}s
              </div>
            ) : (
              <div className="flex">
                <div className="grid grid-cols-4 gap-5 w-[800px] mx-auto mt-5">
                  {cards.map((item: CardInterface) => (
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
          {time === 0 && (
            <div className="absolute w-full h-full animate-clear">
              <div className=" w-full h-full bg-[#333] opacity-80"></div>
              <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-red-500 text-6xl ">
                You Lose!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
