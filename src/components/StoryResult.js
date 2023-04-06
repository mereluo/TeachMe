import React from "react";

const StoryResult = ({ imgResult, txtResult }) => {
  return (
    <div>
      <h4>Your Story: </h4>
      <p>Images and text will be shown below</p>
      <div>
        {imgResult && imgResult.map((imgSrc, index) => (
          // <img key={index} src={imgSrc} alt={`Image ${index}`} />
          <div key={index}>
            <img src={imgSrc} alt={`Image ${index}`} />
            <p>{txtResult[index]}</p>
        </div>
        ))}

      </div>
    </div>
  );
};

export default StoryResult;