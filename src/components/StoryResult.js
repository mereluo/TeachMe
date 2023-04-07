import React,{ useState }  from "react";
import Carousel from 'react-bootstrap/Carousel';
import styles from '../styles/story.module.css'

const StoryResult = ({ imgResult, txtResult }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <h4 class={styles.title}>Your Story: </h4>
      {/* <p>Images and text will be shown below</p> */}
      <Carousel  slide={false} interval={null} activeIndex={index} onSelect={handleSelect}>
        {imgResult && imgResult.map((imgSrc, index) => (
          // // className="d-block w-100"
          <Carousel.Item >
            <img
              className={`d-block ${styles.block_size}`}
              src={imgSrc}
              alt={`Image ${index}`}
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3> */}
              <p class={styles.contentbg}>{txtResult[index]}</p>
            </Carousel.Caption>
        </Carousel.Item>
        ))}
      </Carousel>
      {/* <div>
        {imgResult && imgResult.map((imgSrc, index) => (
          // <img key={index} src={imgSrc} alt={`Image ${index}`} /> 
          <div key={index}>
            <img src={imgSrc} alt={`Image ${index}`} />
            <p>{txtResult[index]}</p>
        </div>
        ))}
       
      </div> */}
    </div>
  );
};

export default StoryResult;