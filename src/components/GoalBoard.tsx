import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const GoalBoard = () => {
  const goalBoard = useSelector((state: RootState) => state.goalBoard.goalBoard)
    
  return (
    <div className="text-center text-white border border-dashed border-[mediumvioletred] rounded-lg bg-[#333] w-[180px]">
      <h1 className="py-2 text-2xl border-b border-dashed border-[mediumvioletred]">Goal-Board</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="pl-2">No</th>
            <th>Turns</th>
          </tr>
        </thead>
        <tbody>
          {goalBoard.map((item: number, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalBoard;
