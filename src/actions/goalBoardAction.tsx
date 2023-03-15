export const ActionGoalBoardTypes = {
  ADD: "ADD_TURN_TO_GOALBOARD",
  NEXTTURN: "NEXT_TURN",
  RESETTURN: "RESET_TURN",
};

export const addTurnToGoalBoard = () => ({ type: ActionGoalBoardTypes.ADD });

export const nextTurn = () => ({ type: ActionGoalBoardTypes.NEXTTURN });

export const resetTurnToZero = () => ({ type: ActionGoalBoardTypes.RESETTURN });
