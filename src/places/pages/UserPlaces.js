import React, { useEffect } from 'react';
import PlaceList from '../component/PlaceList/PlaceList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from '../../shared/component/UIELEMENT/Spinner/LoadingSpinner';

function UserPlaces() {
  // useParams is to get all the data from the params. it is react hook.
  // <Route path='/:userId/places' component={UserPlaces}></Route>. in the app we have deifned the params as userId so we can get the params in the same way
  const userId = useParams().userId;
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `http://localhost:5000/api/v1/places/user/${userId}`,
        });
        console.log(res.data.place.places);
        setPlace(res.data.place.places);
      } catch (error) {}
    };
    fetchPlace();
  }, []);

  // const loadedPlaces = DUMMY_PLACES.filter((el) => el.creator === userId);
  let content = <LoadingSpinner overlay />;
  if (place) {
  }
  content = <PlaceList items={place} />;

  return content;
}

export default UserPlaces;
