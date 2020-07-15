import { validate } from '../Validation/Validator';

export const initialState = {
  value: '',
  isValid: false,
  isTouched: false,
};

export const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
