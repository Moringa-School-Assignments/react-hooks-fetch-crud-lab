import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
      })
  }, [deleted])

  function handleDelete(id) {
    console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // setQuestions(()=> questions)
        setQuestions(questions)
        setDeleted(deleted == true ? false : true)
      })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) return updatedQuestion;
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          questions != [] ?
            questions.map(question => {
              return (
                <Fragment key={question.id}>
                  <QuestionItem question={question} handleDelete={handleDelete} handleAnswerChange={handleAnswerChange} />
                </Fragment>
              )
            })
            :
            null
        }
      </ul>

    </section>
  );
}

export default QuestionList;
