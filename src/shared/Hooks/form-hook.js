import { useCallback, useReducer } from 'react';
import { formReducer } from '../component/FormElement/FormReducer';

export const useForm = (inputs, isValid) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs,
    isValid,
  });

  // useCallback is used to prevent infinite loop
  const InputHandler = useCallback((id, value, isValid) => {
    // FOR CHANGING THE STATE INPUT VALUE
    dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
    // FOR CHECKING THE WHOLE FORM VALIDITY
    dispatch({ type: 'CHECK_FORM_VALIDITY', isValid });
  }, []);
  // our data are not fetched instantly from the backend so we cannot use the useForm hook directly cause we are expecting value and also we cannot set useForm in any if or loops. to overcome this problem we will set our state of updatePlace to invalid data and as soon as we fetch the data from the back end we have to update the state
  const setFormData = useCallback((inputs, isValid) => {
    dispatch({
      type: 'FETCH_DATA_SUCCESS',
      inputs,
      isValid,
    });
  }, []);

  return [state, InputHandler, setFormData];
};
