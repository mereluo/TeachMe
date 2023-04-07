import React from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/story.module.css';
import Container from 'react-bootstrap/Container'; // Import Container component from Bootstrap

const StoryForm = ({ onSubmit, userPromptInput, setUserPromptInput, status }) => {
  return (
    <Container> {/* Wrap the form with a Container */}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="userPromptInput"
          placeholder="What Should The Story Be About? Firetrucks, Traveling To Paris, Or Math?"
          value={userPromptInput}
          onChange={(e) => setUserPromptInput(e.target.value)}
          className={`${styles.input} form-control`}
        />
        <Button type="submit" disabled={status=="loading"?true:false} className={styles.btn}> {/* Add the custom CSS class to the button */}
          Create Story
          {status=="loading" && (
            <Spinner style={{marginLeft: '5px'}} size="sm" animation="grow" variant="light" />
          )}
        </Button>
      </form>
    </Container>
  );
};

export default StoryForm;
