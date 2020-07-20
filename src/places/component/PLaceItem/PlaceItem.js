import React, { useState, useContext } from 'react';
import Card from '../../../shared/component/UIELEMENT/Card/Card';

import Button from '../../../shared/component/FormElement/Button';
import './PlaceItem.css';

import Modal from '../../../shared/component/UIELEMENT/Modal/Modal';
import Map from '../../../shared/component/UIELEMENT/Map/Map';
import { AuthContext } from '../../../shared/Context/AuthContext';
import { useHttpHook } from '../../../shared/Hooks/Http-hook';
import ErrorModal from '../../../shared/component/UIELEMENT/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/component/UIELEMENT/Spinner/LoadingSpinner';

function PlaceItem(props) {
  const {
    image,
    title,
    address,
    description,
    location,
    _id,
    creator,
  } = props.placeItem;

  // use context
  const { userID } = useContext(AuthContext);

  //custom hook
  const { isLoading, error, fetchData, clearError } = useHttpHook();
  // MAP MODAL
  const [showMap, setShowMap] = useState(false);
  // DELETE COMFIRM MODAL
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // MAP MODAL
  const mapOpenHandler = () => {
    setShowMap((prevstate) => !prevstate);
  };
  // close modal
  const showConfirmModalHandler = () => {
    setShowConfirmModal((prevState) => !prevState);
  };
  // DELETE CONFIRM HANDLER CONFIRM DELETE ACTION
  //
  const confirmDeleteHandler = async () => {
    showConfirmModalHandler();
    // we want to stay in the same page and also not send http request again to fetch data. if we simply delete the place it will be deleted from the db but the component will not re-render. so we handle the delete action in users page and filter out the place which was just deleted
    try {
      await fetchData(
        `http://localhost:5000/api/v1/places/${_id}`,
        'DELETE',
        null,
        {
          'Content-Type': 'application/json',
        }
      );
      props.onDelete(_id);
    } catch (error) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {/* // in modal this will be visible when show is true onCancel will close the
      modal when we click the Backdrop. header is defined in the modal just for
      giving titles and everything u can check it therr. contentClass means if
      no className is defined it will take the default class defined in the
      Modal else take the new classname as here it takes
      place-item__modal-content. similarly other content as well */}
      <Modal
        show={showMap}
        onCancel={mapOpenHandler}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={mapOpenHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <h2>
            <Map center={location} zoom={6} />
          </h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        // on Calcel meanss when user press the backdrop
        onCancel={showConfirmModalHandler}
        header='ARE YOU SURE ?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button onClick={showConfirmModalHandler} inverse>
              CANCEL
            </Button>
            <Button onClick={confirmDeleteHandler} danger>
              DELETE
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Do You want to proceed and delete this place ? Please note that it can
          not be undone!!!
        </p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}{' '}
          <div className='place-item__image'>
            <img
              src={`http://localhost:5000/uploads/images/${image}`}
              alt={title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={mapOpenHandler}>
              View On map
            </Button>
            {userID === creator && (
              <>
                <Button to={`/places/${_id}`}>Edit</Button>
                <Button danger onClick={showConfirmModalHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
