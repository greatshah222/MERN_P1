import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../shared/component/UIELEMENT/Card/Card';
import Input from '../../shared/component/FormElement/Input';
import Button from '../../shared/component/FormElement/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/component/Validation/Validator';
import './PlaceForm.css';
import { useForm } from '../../shared/Hooks/form-hook';
import { useHttpHook } from '../../shared/Hooks/Http-hook';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';
function UpdatePlace() {
  //   custom hooks
  const placeId = useParams().placeId;
  const { isLoading, error, fetchData, clearError } = useHttpHook();
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();

  //   fetching the data from the server takes time so initially these value are set to false and empty and after fetching the data from the server
  // the first is the inputs the second one is isValid(whole form ) and 3rd one is setFormData
  const [state, InputHandler, setFormData] = useForm(
    {
      Title: {
        value: '',
        isValid: false,
      },
      Description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  //   here we get the data from the server after async await . so setting the value to their original form after fetching successfully.

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetchData(
          `http://localhost:5000/api/v1/places/${placeId}`,
          'GET'
        );
        setLoadedPlace(res.place);

        setFormData(
          {
            Title: {
              value: res.place.title,
              isValid: true,
            },
            Description: {
              value: res.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [fetchData, placeId, setFormData]);

  if (isLoading) {
    return (
      <div className='center'>
        <Card>
          <LoadingSpinner asOverlay />
        </Card>
      </div>
    );
  }
  if (!loadedPlace && !isLoading && !error) {
    return (
      <div className='center'>
        <Card>
          {' '}
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      await fetchData(
        `http://localhost:5000/api/v1/places/${placeId}`,
        'PATCH',
        {
          title: state.inputs.Title.value,
          description: state.inputs.Description.value,
        },
        {
          'Content-Type': 'application/json',
        }
      );
      history.goBack();
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && !error && (
        <form className='place-form' onSubmit={submitFormHandler}>
          <Input
            id='Title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='please enter a valid '
            // here stat.inputs.Title.value will not work
            initialValue={loadedPlace.title}
            initialValid={true}
            onInput={InputHandler}
          />
          <Input
            id='Description'
            type='text'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='please enter a valid(MIN 5 CHARACTER ) '
            initialValue={loadedPlace.description}
            initialValid={true}
            onInput={InputHandler}
          />
          <Button type='submit' disabled={!state.isValid}>
            UPDATE FORM
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
