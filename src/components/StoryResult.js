import React from "react";

const StoryResult = ({ imgResult, txtResult }) => {
  return (
    <>
      <h4>Your Story: </h4>
      <p>Images and text will be shown below</p>
      <div>
        <img src={imgResult}></img>
        <p>{txtResult}</p>
      </div>
    </>
  );
};

export default StoryResult;