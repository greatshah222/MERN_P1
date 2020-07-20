import React, { useContext } from 'react';
import './PlaceForm.css';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/component/Validation/Validator';
import { useForm } from '../../shared/Hooks/form-hook';
import { useHttpHook } from '../../shared/Hooks/Http-hook';
import { AuthContext } from '../../shared/Context/AuthContext';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../shared/ImageUpload/ImageUpload';

function NewPlaces() {
  const { isLoading, error, fetchData, clearError } = useHttpHook();
  const { userID } = useContext(AuthContext);
  // like params this is for history
  const history = useHistory();

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
      Image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  // form sumit handler

  const placeSubmithandler = async (e) => {
    const { Title, Description, Address, Image } = state.inputs;

    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', Title.value);
      formData.append('description', Description.value);
      formData.append('address', Address.value);
      formData.append('creator', userID);
      formData.append('image', Image.value);
      await fetchData('http://localhost:5000/api/v1/places', 'POST', formData, {
        'Content-Type': 'multipart/form-data',
      });
      history.push('/');
    } catch (error) {}
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <form className='place-form' onSubmit={placeSubmithandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='Title'
          type='text'
          label='Title'
          element='input'
          errorText='please enter a valid(at least 10 character) '
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
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
        <ImageUpload
          id='Image'
          center
          onInput={InputHandler}
          errorText='Please attach an Image'
        />
        <Button type='submit' disabled={!state.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}

export default NewPlaces;
