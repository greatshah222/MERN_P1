import React from 'react';
import './PlaceForm.css';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/component/Validation/Validator';
import { useForm } from '../../shared/Hooks/form-hook';

function NewPlaces() {
  // custom hooks
  const [state, InputHandler] = useForm(
    {
      Title: {
        value: '',
        isValid: false,
      },
      Description: {
        value: '',
        isValid: false,
      },
      Address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  // form sumit handler

  const placeSubmithandler = (e) => {
    e.preventDefault();
    console.log(state.inputs);
  };
  return (
    <form className='place-form' onSubmit={placeSubmithandler}>
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
        element='textarea'
        rows='10'
        errorText='please enter a valid(at least 5 character)  '
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={InputHandler}
      />
      <Input
        type='text'
        id='Address'
        label='Address'
        element='input'
        errorText='please enter a valid  '
        validators={[VALIDATOR_REQUIRE()]}
        onInput={InputHandler}
      />
      <Button type='submit' disabled={!state.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewPlaces;
