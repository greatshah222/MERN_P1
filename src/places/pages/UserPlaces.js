import React from 'react';
import PlaceList from '../component/PlaceList/PlaceList';
import { useParams } from 'react-router-dom';
export const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'shahh big building',
    description: 'lorem is the building block for html content ',
    imageUrl:
      'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    address: 'bagbazar kathmandu',
    creator: 'u1',
    coordinates: [-74.5, 40],
  },
  {
    id: 'p2',
    title: 'shahh big new',
    description: 'lorem is the building block for html content ',
    imageUrl:
      'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    address: 'bagbazar kathmandu',
    creator: 'u2',
    // coordinates: {
    //   lat: 40.7485,
    //   lng: -73.9878,
    // },
    coordinates: [-74.5, 40],
  },
];
function UserPlaces() {
  // useParams is to get all the data from the params. it is react hook.
  // <Route path='/:userId/places' component={UserPlaces}></Route>. in the app we have deifned the params as userId so we can get the params in the same way
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((el) => el.creator === userId);

  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
