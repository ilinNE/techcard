interface IMessage {
  type: string;
  payload: object;
}

const initialState = {
  currentUser: {},
  isLoading: false,
};

enum actionTypes {
  GET_CURRENT_USER = "GET_CURRENT_USER",
  GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
  GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

export const currentUserReducer = (state = initialState, action: IMessage) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return { ...state, currentUser: {}, isLoading: true };
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: action.payload, isLoading: false };
    case actionTypes.GET_CURRENT_USER_ERROR:
      return { ...state, currentUser: {}, isLoading: false };
    case actionTypes.CLEAR_CURRENT_USER:
      return { ...state, currentUser: {}, isLoading: false };
    default:
      return state;
  }
};

export const getCurrentUser = () => ({
  type: actionTypes.GET_CURRENT_USER,
});

export const getCurrentUserSuccess = (payload: { username: string; email: string }) => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS,
  payload,
});

export const getCurrentUserError = () => ({
  type: actionTypes.GET_CURRENT_USER_ERROR,
});

export const clearCurrentUser = (payload: {}) => ({
  type: actionTypes.CLEAR_CURRENT_USER,
  payload,
});
