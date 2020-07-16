import React, { useReducer, useEffect } from 'react';
import './Input.css';
import { inputReducer } from './InputReducer';

function Input(props) {
  // we are putting props.value or valid for the update page
  const initialState = {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);
  const { value, isTouched, isValid } = state;
  const { onInput, id } = props;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validators: props.validators,
    });
  };

  // show error only after user has touched it can be done by blur events
  const touchedhandler = () => {
    dispatch({ type: 'TOUCH' });
  };
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchedhandler}
        value={value}
      />
    ) : (
      <textarea
        id={props.id}
        onChange={changeHandler}
        onBlur={touchedhandler}
        value={value}
        rows={props.rows || 3}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!isValid && isTouched && (
        <p>
          {props.errorText}
          {props.label}
        </p>
      )}
    </div>
  );
}

export default Input;
