import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';
import Button from '../component/FormElement/Button';
function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  // whenver we pass a new file we will rendder this component so useEffect

  useEffect(() => {
    // generate a preview

    if (!file) {
      return;
    }
    // fileReader is built in the browser
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickImageHandler = () => {
    // click property exists on the dom nodemand it will open up the file picker. so when wee press the button we want to open the input button that is why we have attached a ref there
    filePickerRef.current.click();
  };

  const pickedCHangedHandker = (e) => {
    // if the event targerrt is the native file picker we will get e.target.files
    // here uploading one files so there is one
    let pickedFile;
    // because of the batching in the react even if we cahnge the valid property and pass it to the other function it will have the sma eold value so using alternative of manual true or false. is 1 in e.target.files cause we want to handle exact 1 image here
    let fileIsValid = isValid;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      // if the condition does not matches above the valid will be false
      setIsValid(false);
      fileIsValid = false;
    }
    // if the above fails pickedFile will be undefined so not a problem
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  return (
    // display none cause we dont dont want to show the default(BUILT-IN) file picker image here
    <div className='form-control'>
      <input
        type='file'
        id={props.id}
        style={{ display: 'none' }}
        accept='.jpg,.png,.pdf,.jpeg'
        ref={filePickerRef}
        // when the user picks the file
        onChange={pickedCHangedHandker}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>please pick an image</p>}
        </div>
        <Button type='button' onClick={pickImageHandler}>
          SELECT A IMAGE
        </Button>
      </div>
      {/* // if we chhose invalid file */}
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
