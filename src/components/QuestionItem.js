import React from "react";

function QuestionItem({ question, handleDelete, handleAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  function handleDeleteAction(){
    handleDelete(id)
  }
  function handleSelectChange(e){
    handleAnswerChange(id, e.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick={handleDeleteAction}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
