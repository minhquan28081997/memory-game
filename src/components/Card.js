import React from "react";

const Card = ({ item, handleChoice, matched, disable }) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(item);
    }
  };

  return (
    <div className='w-full h-full relative cursor-pointer duration-200 hover:scale-105' onClick={handleClick}>
      <img src={item.src} alt={item.id} />
      <img
        className={`${matched && "transform rotate-180 opacity-0 duration-300 "} absolute top-0 h-full`}
        src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg"
        alt="card-layout"
      />
    </div>
  );
};

export default Card;
