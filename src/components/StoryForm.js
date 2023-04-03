import React from "react";
import Button from 'react-bootstrap/Button';

const StoryForm = ({ onSubmit, userPromptInput, setUserPromptInput }) => {
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
        name="userPromptInput"
        placeholder="Enter an prompt"
        value={userPromptInput}
        onChange={(e) => setUserPromptInput(e.target.value)}
      />
      {/* <input type="submit" value="Create Story" /> */}
      <Button type="submit" variant="success">
        Create Story
      </Button>
    </form>
  );
};

export default StoryForm;