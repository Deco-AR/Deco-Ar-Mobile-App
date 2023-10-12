import {SAVE_USER_INFO, LOGOUT} from '../../constants';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {...action.payload};
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
