import React, { useEffect } from 'react';
import PlaceList from '../component/PlaceList/PlaceList';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useHttpHook } from '../../shared/Hooks/Http-hook';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';
import Card from '../../shared/component/UIELEMENT/Card/Card';
import ErrorModal from '../../shared/component/UIELEMENT/ErrorModal/ErrorModal';

function UserPlaces() {
  const userId = useParams().userId;
  const [place, setPlace] = useState([]);
  const { isLoading, error, fetchData, clearError } = useHttpHook();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetchData(
          `http://localhost:5000/api/v1/places/user/${userId}`,
          'GET'
        );

        setPlace(res.place.places);
      } catch (error) {}
    };
    fetchPlace();
  }, [fetchData, userId]);
  const onPlacesDeleteHandler = (_id) => {
    setPlace((prevState) => prevState.filter((el) => el._id !== _id));
  };
  let content;
  if (isLoading) {
    content = (
      <Card className='center'>
        <LoadingSpinner overlay />
      </Card>
    );
  }
  if (place && !isLoading) {
    content = <PlaceList items={place} onDelete={onPlacesDeleteHandler} />;
  }
  if (error) {
    content = <ErrorModal error={error} onClear={clearError} />;
  }

  return content;
}

export default UserPlaces;
