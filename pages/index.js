import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [imgResult, setImgResult] = useState();
  const [txtResult, setTxtResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      console.log(data);

      setImgResult(data.result.img);
      setTxtResult(data.result.data);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      // alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>StoryLand</title>
     </Head>
      <nav>

      </nav>
      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>StoryLand</h3>
        <p>Be part of your own story, a new interactive learning method for children that's engaging. </p>
        <img src="/avatar.png" className={styles.icon} />
        <form onSubmit={onSubmit}>

        {/* <button className={styles.result} type="submit" name="option" value="option1">Prompt 1: Firetruck</button>
        <button className={styles.result} type="submit" name="option" value="option2">Prompt 2: Paris</button>
        <button className={styles.result} type="submit" name="option" value="option3">Prompt 3: Math </button> */}
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

          <input type="submit" value="Create Story" />
        </form>
        <h4>Your Story: </h4>
        <p>Images and text will be shown below</p>
      
        <div>
          <img src={imgResult}>
          </img>
          <p>{txtResult}</p>
      </div>

        <h4>Let your student learn interactively </h4>
        <p>Quiz your student on what they learned</p>

      </main>
    </div>
  );
}
