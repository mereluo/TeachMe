import React from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/story.module.css';
import Container from 'react-bootstrap/Container'; // Import Container component from Bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const StoryForm = ({ onSubmit, userPromptInput, setUserPromptInput, status }) => {
  
  const handleOnClick = (e) =>{
    console.log(e.target.innerText);
    setUserPromptInput(e.target.innerText)
  }

  return (
    <Container> {/* Wrap the form with a Container */}
      {/* <form onSubmit={onSubmit} className={styles.form}> */}
        {/* <input
          type="text"
          name="userPromptInput"
          placeholder="What Should The Story Be About? Firetrucks, Traveling To Paris, Or Math?"
          value={userPromptInput}
          onChange={(e) => setUserPromptInput(e.target.value)}
          className={`${styles.input} form-control`}
        /> */}
        <>
          <style type="text/css">
            {`
              .btn-outline-orange{
                --bs-btn-color: orange!important;
                --bs-btn-border-color: orange!important;
                --bs-btn-hover-color: white!important;
                --bs-btn-hover-bg: orange!important;
                --bs-btn-hover-border-color: orange!important;
                --bs-btn-active-color: white!important;
                --bs-btn-active-bg: orange!important;
                --bs-btn-active-border-color: orange!important;
              }
            `}
          </style>
        </>

      <InputGroup className={`mb-3 mt-3 ${styles.input}`}>
        <Form.Control value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} aria-label="userPromptInput" />

        <DropdownButton
          variant="outline-orange"
          title="Example"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item onClick={handleOnClick}  href="#">Firetrucks</Dropdown.Item>
          <Dropdown.Item onClick={handleOnClick}  href="#">Traveling To Paris</Dropdown.Item>
          <Dropdown.Item onClick={handleOnClick}  href="#">Math</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      <Button type="submit" disabled={status=="loading"?true:false} className={styles.btn} onClick={onSubmit}> {/* Add the custom CSS class to the button */}
          Create Story
          {status=="loading" && (
            <Spinner style={{marginLeft: '5px'}} size="sm" animation="grow" variant="light" />
          )}
      </Button>
        
        
      {/* </form> */}
    </Container>
  );
};

export default StoryForm;
