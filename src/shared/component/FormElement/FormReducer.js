export const InitialStateNewPlace = {
  inputs: {
    Title: {
      value: '',
      isValid: false,
    },
    Description: {
      value: '',
      isValid: false,
    },
  },
  isValid: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
      };
    case 'CHECK_FORM_VALIDITY':
      const totalFormValid = Object.values(state.inputs).every(
        (el) => el.isValid
      );
      return {
        ...state,
        isValid: totalFormValid,
      };
    default:
      return state;
  }
};
