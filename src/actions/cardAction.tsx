import { CardInterface } from "../card.type";

interface IChangeCard {
  cards: CardInterface[];
  choiceOneValue: number;
}

export const ActionCardTypes = {
  RANDOM: "RANDOM_CARDS",
  CHANGE: "CHANGE_MATCHED_CARD",
};

export const randomCard = () => ({ type: ActionCardTypes.RANDOM });

export const changeMatchedCard = (payload: IChangeCard) => ({
  type: ActionCardTypes.CHANGE,
  payload,
});
