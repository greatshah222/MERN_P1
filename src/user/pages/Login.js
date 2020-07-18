import React, { useContext, useState } from 'react';

import axios from 'axios';
import { useForm } from '../../shared/Hooks/form-hook';
import Input from '../../shared/component/FormElement/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/component/Validation/Validator';
import Button from '../../shared/component/FormElement/Button';
import Card from '../../shared/component/UIELEMENT/Card/Card';
import { AuthContext } from '../../shared/Context/AuthContext';

import './Login.css';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';

function Login() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // we need to pass the inputs and isValid property of form to useForm
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
    },
    false
  );

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const { EMAIL, PASSWORD } = state.inputs;

      const res = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: 'http://localhost:5000/api/v1/users/login',
        data: {
          email: EMAIL.value,
          password: PASSWORD.value,
        },
      });
      setIsLoading(false);
      setError(null);
      console.log(res.data);
      await login();
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
      setError(
        error.response.data.message || 'Something went wrong please try again'
      );
    }
  };
  const errorModalClearHandler = () => {
    setError(null);
  };
  return (
    <Card className='authentication'>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={errorModalClearHandler} />}
      <h2 className='header'>Login Page</h2>
      <hr />
      <form onSubmit={loginSubmitHandler}>
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
          errorText='please enter a valid(at least 5 character) '
          onInput={InputHandler}
        />

        <Button type='submit' disabled={!state.isValid}>
          LOGIN
        </Button>
      </form>
      <Button to='/signup' inverse>
        Create Account?
      </Button>
    </Card>
  );
}

export default Login;
