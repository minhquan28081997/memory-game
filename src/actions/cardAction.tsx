export const ActionTypes = {
  RANDOM: "RANDOM_CARDS",
  CHANGE: "CHANGE_MATCHED_CARD",
};

export const randomCard = () => {
  return {
    type: ActionTypes.RANDOM,
  };
};

export const changeMatchedCard = (payload: any) => {
  return {
    type: ActionTypes.CHANGE,
    payload,
  };
};
