import React,{ useState }  from "react";
import Carousel from 'react-bootstrap/Carousel';
import styles from '../styles/story.module.css'
import HTMLFlipBook from 'react-pageflip';

const StoryResult = ({ imgResult, txtResult, childName }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <h4 class={styles.title}> </h4>
       <HTMLFlipBook width={300} height={500} className={`${styles.book}`}>
       <div className={`demoPage ${styles.book} ${styles.cover}`}>
              <h4 className={`${styles.title}`}>{"My Wonderful Story"}</h4>
              <img src="/avatar.png" className={styles.coverImg} />
              <p className={`${styles.author}`}><span>Created By: </span>"Me !"</p>
          </div>
          <div  className={`demoPage ${styles.summary}`}>
            <h4>Summary:</h4>
            <p >This book is the great adventure of {childName} the soon to be king of the pirates!</p>
          </div>

       {imgResult && imgResult.map((imgSrc, index) => (

        <div className={`demoPage ${styles.page}`}>
            <img
              src={imgSrc}
              alt={`Image ${index}`}
            />
            <p >{txtResult[index]}</p>

         </div>


        ))}
         <div className={`demoPage ${styles.end}`}>

            <h4>The End!</h4>

         </div>
        </HTMLFlipBook>
        </>




  );
};

export default StoryResult;