import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "../styles/index.module.css";
import Header from "../components/Header";
import StoryForm from "../components/StoryForm";
import StoryResult from "../components/StoryResult";
import QuizSection from "../components/QuizSection";
import 'bootstrap/dist/css/bootstrap.min.css';


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

    //   console.log(data);
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
      <main className={styles.main}>
        <Header />
        <StoryForm
          onSubmit={onSubmit}
          animalInput={animalInput}
          setAnimalInput={setAnimalInput}
        />
        <StoryResult imgResult={imgResult} txtResult={txtResult} />
        <QuizSection />
      </main>
    </div>
  );
}
