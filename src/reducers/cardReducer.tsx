import { AnyAction } from "redux";
import { dataImg } from "../data";
import { CardInterface } from "../card.type";
import { ActionCardTypes } from "../actions/cardAction";

interface CardState {
  card: CardInterface[];
}

const initialState: CardState = {
  card: [],
};

const cardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionCardTypes.RANDOM: {
      const newData = [...dataImg, ...dataImg]
        .sort(() => 0.5 - Math.random())
        .map((item, index) => ({ ...item, id: index + 1 }));

      return {
        ...state,
        card: newData,
      };
    }

    case ActionCardTypes.CHANGE: {
      const newData = action.payload.cards.map((card: CardInterface) => {
        if (card.value === action.payload.choiceOneValue) {
          return {
            ...card,
            match: true,
          };
        }
        return card;
      });

      return {
        ...state,
        card: newData,
      };
    }

    default:
      return state;
  }
};
export default cardReducer;
