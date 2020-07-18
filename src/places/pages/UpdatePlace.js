// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { DUMMY_PLACES } from './UserPlaces';
// import Card from '../../shared/component/UIELEMENT/Card/Card';
// import Input from '../../shared/component/FormElement/Input';
// import Button from '../../shared/component/FormElement/Button';
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH,
// } from '../../shared/component/Validation/Validator';
// import './PlaceForm.css';
// import { useForm } from '../../shared/Hooks/form-hook';
// import axios from 'axios';
// function UpdatePlace() {
//   const [loading, setLoading] = useState(true);
//   custom hooks
//   const placeId = useParams().placeId;

//   useEffect(() => {
//     const fetchPlace = async () => {
//       try {
//       } catch (error) {}
//     };
//     fetchPlace();
//   }, []);

//   fetching the data from the server takes time so initially these value are set to false and empty and after fetching the data from the server
//   const [state, InputHandler, setFormData] = useForm(
//     {
//       Title: {
//         value: '',
//         isValid: false,
//       },
//       Description: {
//         value: '',
//         isValid: false,
//       },
//     },
//     false
//   );
//     const identifiedPlace = DUMMY_PLACES.find((el) => el.id === placeId);
//   here we get the data from the server after async await . so setting the value to their original form after fetching successfully.
//   useEffect(() => {
//     check if there is data
//     if (identifiedPlace) {
//       setFormData(
//         {
//           Title: {
//             value: identifiedPlace.title,
//             isValid: true,
//           },
//           Description: {
//             value: identifiedPlace.description,
//             isValid: true,
//           },
//         },
//         true
//       );
//       setLoading(false);
//     }
//   }, [setFormData, identifiedPlace, setLoading]);

//   if (!identifiedPlace) {
//     return (
//       <div className='center'>
//         <Card>
//           {' '}
//           <h2>Could not find place</h2>
//         </Card>
//       </div>
//     );
//   }
//   if (loading) {
//     return (
//       <div className='center'>
//         <Card>
//           <h2>Loading....</h2>
//         </Card>
//       </div>
//     );
//   }
//   const submitFormHandler = (e) => {
//     e.preventDefault();
//     console.log(state.inputs);
//   };
//   return (
//     <form className='place-form' onSubmit={submitFormHandler}>
//       <Input
//         id='Title'
//         element='input'
//         type='text'
//         label='Title'
//         validators={[VALIDATOR_REQUIRE()]}
//         errorText='please enter a valid '
//         initialValue={state.inputs.Title.value}
//         initialValid={state.inputs.Title.isValid}
//         to check the validaity of form after every onChange handler
//         onInput={InputHandler}
//       />
//       <Input
//         id='Description'
//         type='text'
//         label='Description'
//         validators={[VALIDATOR_MINLENGTH(5)]}
//         errorText='please enter a valid(MIN 5 CHARACTER ) '
//         initialValue={state.inputs.Description.value}
//         initialValid={state.inputs.Description.isValid}
//         onInput={InputHandler}
//       />
//       <Button type='submit' disabled={!state.isValid}>
//         UPDATE FORM
//       </Button>
//     </form>
//   );
// }

// export default UpdatePlace;
