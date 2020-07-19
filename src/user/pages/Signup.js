import React, { useContext } from 'react';
import { useForm } from '../../shared/Hooks/form-hook';
import Card from '../../shared/component/UIELEMENT/Card/Card';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import { AuthContext } from '../../shared/Context/AuthContext';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/component/Validation/Validator';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';

import { useHttpHook } from '../../shared/Hooks/Http-hook';

function Signup() {
  // we need to pass the initial inputs and initialFormValidity to useForm
  const { isLoading, error, fetchData } = useHttpHook();
  const [state, InputHandler] = useForm(
    {
      EMAIL: {
        value: '',
        isValid: false,
      },
      PASSWORD: {
        value: '',
        isValid: false,
      },
      PASSWORDCONFIRM: {
        value: '',
        isValid: false,
      },
      NAME: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const { login } = useContext(AuthContext);
  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { EMAIL, PASSWORD, PASSWORDCONFIRM, NAME } = state.inputs;
      // custom hook
      await fetchData(
        'http://localhost:5000/api/v1/users/signup',
        'POST',
        {
          email: EMAIL.value,
          password: PASSWORD.value,
          name: NAME.value,
          passwordConfirm: PASSWORDCONFIRM.value,
        },
        {
          'Content-Type': 'application/json',
        }
      );

      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className='authentication'>
      {isLoading && <LoadingSpinner asOverlay />}
      {/* {error && <ErrorModal error={error} onClear={clearError} />} */}
      {error && (
        <p className='center' style={{ color: 'red' }}>
          {error}
        </p>
      )}
      <h2 className='header'>Login Page</h2>
      <hr />
      <form onSubmit={signupSubmitHandler}>
        <Input
          id='NAME'
          label='NAME'
          placeholder='Enter Your NAME'
          type='text'
          element='input'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='please enter a valid '
          onInput={InputHandler}
        />
        <Input
          id='EMAIL'
          label='EMAIL'
          placeholder='Enter Your Email'
          type='text'
          element='input'
          validators={[VALIDATOR_EMAIL()]}
          errorText='please enter a valid '
          onInput={InputHandler}
        />
        <Input
          id='PASSWORD'
          label='PASSWORD'
          placeholder='Enter Your PASSWORD'
          type='Password'
          element='input'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='please enter (at least 5 character) '
          onInput={InputHandler}
        />
        <Input
          id='PASSWORDCONFIRM'
          label='PASSWORD CONFIRM'
          placeholder='Enter Your Password Again'
          type='Password'
          element='input'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Password does not match '
          onInput={InputHandler}
        />

        <Button type='submit' disabled={!state.isValid}>
          SIGNUP
        </Button>
      </form>
      <Button to='/login' inverse>
        Login?
      </Button>
    </Card>
  );
}

export default Signup;
