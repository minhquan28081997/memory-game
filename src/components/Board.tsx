import React from "react";

import { useSelector } from "react-redux";

import { IBoard } from "../card.type";
import { RootState } from "../store/store";

import Loading from "./Loading";

interface Props {
  title: string;
  board: IBoard[];
}

const Board = ({ title, board }: Props) => {
  const loading = useSelector((state: RootState) => state.board.loading);

  return (
    <div className="p-5 border border-dashed border-[mediumvioletred] rounded-lg text-[#ccc]">
      <div className="relative mb-5">
        <h1 className="text-center text-2xl ">{title}</h1>
        <div className="absolute bottom-[-5px] left-1/2 translate-x-[-50%] w-20 h-[2px] bg-[#ccc]"></div>
      </div>
      {!loading ? (
        <table className="w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>{title === "Top 5 Lowest Time" ? "Time" : "Turn"}</th>
              {title === 'Current Board' && <th>Time</th>}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {board.map((item: IBoard, index: number) => (
              <tr key={item.id} className="text-center">
                <td>{index + 1}</td>
                <td>{item.turns || item.time}</td>
                {title === 'Current Board' && <td>{item.time}</td>}
                <td>{item.createdAt.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Board;
