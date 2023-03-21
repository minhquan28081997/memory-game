import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

import Card from "./components/Card";
import Board from "./components/Board";

import { CardInterface } from "./card.type";
import { RootState } from "./store/store";

import { useDispatch, useSelector } from "react-redux";
import { changeMatchedCard, randomCard } from "./actions/cardAction";
import {
  addToBoard,
  nextTurn,
  resetTurnToZero,
  fetchData,
} from "./actions/boardAction";

const TIMEOUT = 30;

function App() {
  const [choiceOne, setChoiceOne] = useState<number | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<number | null>(null);
  const [disable, setDisable] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [time, setTime] = useState<number>(TIMEOUT);
  const [isOpenGoalBoard, setIsOpenGoalBoard] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const cards = useSelector((state: RootState) => state.card.card);
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(randomCard());
    dispatch(resetTurnToZero());

    setCompleted(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisable(true);
  };

  const handleChoice = (id: number) => {
    choiceOne ? setChoiceTwo(id) : setChoiceOne(id);
  };

  const resetTurn = () => {
    dispatch(nextTurn());

    setChoiceOne(null);
    setChoiceTwo(null);
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
    setIsAnimate(true);

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

    setTimeout(() => setIsAnimate(false), 1000);
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
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const isNotCompleted = cards.some((item: CardInterface) => !item.match); //checked users complete the game or not

    if (!isNotCompleted) {
      dispatch(addToBoard(TIMEOUT - time));

      setCompleted(true);
      clearInt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div
      className="bg-[#333] min-h-[100vh]"
      onClick={() => isOpenGoalBoard && setIsOpenGoalBoard(false)}
    >
      <div className="container mx-auto py-5">
        <h1 className="text-white text-center w-full text-3xl">Memory Game</h1>
        <div className="w-[150px] h-10 mx-auto my-3 text-white duration-300 hover:scale-105">
          <button
            className="w-full h-full border border-white rounded-md disabled:opacity-50 "
            onClick={startGame}
            disabled={isAnimate}
          >
            {completed || !time ? "Restart" : "Start"}
          </button>
        </div>
        <div className="relative flex flex-col">
          <div className="flex justify-between items-center text-white">
            <p>Turn: {board.turns}</p>
            <div className="opacity-80 duration-150 hover:opacity-100">
              <button onClick={() => setIsOpenGoalBoard((prev) => !prev)}>
                <HiMenuAlt3 className="text-3xl" />
              </button>
            </div>
          </div>

          <div className="relative w-full bg-gray-500 rounded-full">
            <div
              className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs text-blue-100 p-0.5 leading-none rounded-full"
              style={{ width: `calc(${time} * 100% / ${TIMEOUT})` }}
            >
              <p className="absolute top-0 left-1/2 translate-x-[-50%]">
                {time}s
              </p>
            </div>
          </div>

          {isOpenGoalBoard && (
            <div className="absolute right-0 top-8 bg-[#444] p-5 rounded-lg z-[1]">
              <div className="grid grid-cols-3 gap-5 container mx-auto">
                <div className="col-start-1 col-end-4">
                  <Board board={board.currentBoard} title="Current Board" />
                </div>
                <Board board={board.lowestTurn} title="Top 5 Lowest Turn" />
                <Board board={board.highestTurn} title="Top 5 Highest Turn" />
                <Board board={board.lowestTime} title="Top 5 Lowest Time" />
              </div>
            </div>
          )}
          <div>
            {completed ? (
              <div className="mt-32 text-4xl text-green-500 text-center animate-clear">
                <p className="animate-bounce">
                  Congratulation! You finished in {board.turns} turns and{" "}
                  {TIMEOUT - time}s
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-5 mt-5">
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
                      isAnimate={isAnimate}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {!time && (
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
