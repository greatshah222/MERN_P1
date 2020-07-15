import React, { useCallback, useReducer } from 'react';
import './NewPlace.css';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/component/Validation/Validator';
import {
  formReducer,
  InitialStateNewPlace,
} from '../../shared/component/FormElement/FormReducer';

function NewPlaces() {
  const [state, dispatch] = useReducer(formReducer, InitialStateNewPlace);

  // useCallback is used to prevent infinite loop
  const InputHandler = useCallback((id, value, isValid) => {
    // FOR CHANGING THE STATE INPUT VALUE
    dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
    // FOR CHECKING THE WHOLE FORM VALIDITY
    dispatch({ type: 'CHECK_FORM_VALIDITY', isValid });
  }, []);
  console.log(state);
  return (
    <form className='place-form'>
      <Input
        id='Title'
        type='text'
        label='Title'
        element='input'
        errorText='please enter a valid '
        validators={[VALIDATOR_REQUIRE()]}
        onInput={InputHandler}
      />
      <Input
        type='text'
        id='Description'
        label='Description'
        element='input'
        errorText='please enter a valid(at least 5 character)  '
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={InputHandler}
      />
      <Button type='submit' disabled={!state.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewPlaces;
