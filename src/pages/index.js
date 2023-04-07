import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "../styles/index.module.css";
import Header from "../components/Header";
import StoryForm from "../components/StoryForm";
import StoryResult from "../components/StoryResult";
import QuizSection from "../components/QuizSection";
import Navbar from "../components/Navbar"; // Import the Navbar component
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  const [userPromptInput, setUserPromptInput] = useState("");
  const [imgResult, setImgResult] = useState();
  const [txtResult, setTxtResult] = useState();
  const [status, setStatus] = useState("empty");//empty loading finished

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setStatus("loading");
      const response = await fetch("/api/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPromt: userPromptInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setStatus("empty");
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setStatus("finish");
    //   console.log(data);
      setImgResult(data.result.img);
      setTxtResult(data.result.data);
      setUserPromptInput("");
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
      <Navbar /> {/* Render the Navbar component */}
      <main className={styles.main}>
        <Header />
        <StoryForm
          onSubmit={onSubmit}
          userPromptInput={userPromptInput}
          setUserPromptInput={setUserPromptInput}
          status={status}
        />
        {status =="finish"&&(
          <StoryResult imgResult={imgResult} txtResult={txtResult} />
        )}
        <QuizSection />
      </main>
    </div>
  );
}
