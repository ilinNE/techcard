interface IMessage {
  type: string;
  payload: object;
}

const initialState = {
  currentUser: {},
};

enum actionTypes {
  GET_CURRENT_USER = "GET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

export const currentUserReducer = (state = initialState, action: IMessage) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case actionTypes.CLEAR_CURRENT_USER:
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};

export const getCurrentUser = (payload: { username: string; email: string }) => ({
  type: actionTypes.GET_CURRENT_USER,
  payload,
});

export const clearCurrentUser = (payload: {}) => ({
  type: actionTypes.CLEAR_CURRENT_USER,
  payload,
});
