export const formReducer = (state, action) => {
  const { type, id, value, isValid, inputs } = action;
  switch (type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [id]: { value, isValid },
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
    case 'FETCH_DATA_SUCCESS':
      return {
        inputs,
        isValid,
      };
    default:
      return state;
  }
};
