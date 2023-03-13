import React from "react";

const GoalBoard = ({ goalBoard }: any) => {
    
  return (
    <table className="mt-5 border border-dashed border-[mediumvioletred] text-center w-[150px] text-white">
      <thead className="border-dashed border-b border-[mediumvioletred]">
        <tr>
          <th>No</th>
          <th>Turns</th>
        </tr>
      </thead>
      <tbody>
        {goalBoard.map((item: number, index: number) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoalBoard;
