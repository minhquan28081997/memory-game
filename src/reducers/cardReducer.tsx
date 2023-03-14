import { AnyAction } from "redux";
import { dataImg } from "../data";
import { CardInterface } from "../card.type";
import { ActionTypes } from "../actions/cardAction";

interface CardState {
  card: CardInterface[];
}

const initialState: CardState = {
  card: [],
};

const cardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.RANDOM: {
      const newData = [...dataImg, ...dataImg]
        .sort(() => 0.5 - Math.random())
        .map((item, index) => ({ ...item, id: index + 1 }));

      return {
        card: newData,
      };
    }

    case ActionTypes.CHANGE: {
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
        card: newData,
      };
    }

    default:
      return state;
  }
};
export default cardReducer;
