interface IMessage {
  type: string;
  payload: string;
}

const initialState = {
  message: "",
};

enum actionTypes {
  ADD_MESSAGE = "ADD_MESSAGE",
  CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

export const popupMessageReducer = (state = initialState, action: IMessage) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return { ...state, message: action.payload };
    case actionTypes.CLEAR_MESSAGE:
      return { ...state, message: "" };
    default:
      return state;
  }
};

export const addMessage = (payload: string) => ({
  type: actionTypes.ADD_MESSAGE,
  payload,
});

export const clearMessage = (payload: string) => ({
  type: actionTypes.CLEAR_MESSAGE,
  payload,
});
