import React from "react";
import Button from 'react-bootstrap/Button';

const StoryForm = ({ onSubmit, animalInput, setAnimalInput }) => {
  return (
    <form onSubmit={onSubmit}>
      <p>Here are some example prompts you can try</p>
      <ul>
        <li>Prompt 1: Write me a story about firetrucks </li>
        <li>Prompt 2: Write me a story to teach my kid about Paris, France</li>
        <li>Prompt 3: Write me a story to teach my child about math</li>
      </ul>
      <input
        type="text"
        name="animal"
        placeholder="Enter an prompt"
        value={animalInput}
        onChange={(e) => setAnimalInput(e.target.value)}
      />
      {/* <input type="submit" value="Create Story" /> */}
      <Button type="submit" variant="success">
        Create Story
      </Button>
    </form>
  );
};

export default StoryForm;