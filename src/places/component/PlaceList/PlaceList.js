import React from 'react';

import Card from '../../../shared/component/UIELEMENT/Card/Card';
import PlaceItem from '../PLaceItem/PlaceItem';

import './PlaceList.css';

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className='place-list center '>
        <Card>
          <h2>No Places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {props.items.map((el) => (
        <PlaceItem key={el.id} placeItem={el} />
      ))}
    </ul>
  );
}

export default PlaceList;
