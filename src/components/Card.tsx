import React from "react";

interface Props {
  key:number,
  src: string,
  id: number,
  handleChoice: (id: number) => void;
  matched: boolean;
  disable: boolean;
}

const Card = ({ src, id, handleChoice, matched, disable }: Props ) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(id);
    }
  };

  return (
    <div
      className="w-full h-full relative cursor-pointer duration-200 hover:scale-105"
      onClick={handleClick}
    >
      <img src={src} alt={`${id}`} />
      <img
        className={`${
          matched && "transform rotate-180 opacity-0 duration-300 "
        } absolute top-0 h-full`}
        src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg"
        alt="card-layout"
      />
    </div>
  );
};

export default Card;
