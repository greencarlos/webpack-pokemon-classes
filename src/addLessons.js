import React, { useState } from "react";
import ReactDOM from "react-dom";

const lessons = await fetch("/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `{ lessons {title} } `,
  }),
})
  .then((res) => res.json())
  .then((res) => {
    return res.data.lessons.map((lesson) => {
      return lesson.title;
    });
  });

const AddLessons = () => {
  const pokemon = JSON.parse(localStorage.getItem("pokemon"));
  const enrolledState = JSON.parse(localStorage.getItem("enrolled"))
  const unenrolledState = JSON.parse(localStorage.getItem('unenrolled'))

  const [enrolled, setEnrolled] = useState(enrolledState);
  const [unenrolled, setUnenrolled] = useState(unenrolledState);
  
  const Enroll = (lesson) => {
    const updatedEnrolls = [lesson, ...enrolled]
    const updatedUnenrolls = unenrolled.filter((name) => name !== lesson)
    setEnrolled(updatedEnrolls);
    setUnenrolled(updatedUnenrolls);
    localStorage.setItem('enrolled', JSON.stringify(updatedEnrolls))
    localStorage.setItem('unenrolled', JSON.stringify(updatedUnenrolls))
    console.log('updatedEnrolls', updatedEnrolls, 'updatedUnenrolls', updatedUnenrolls)
  };

  const Unenroll = (lesson) => {
    const updatedEnrolls = enrolled.filter((name) => name !== lesson)
    const updatedUnenrolls = [lesson, ...unenrolled]
    setEnrolled(updatedEnrolls);
    setUnenrolled(updatedUnenrolls);
    localStorage.setItem('unenrolled', JSON.stringify(updatedUnenrolls))
    localStorage.setItem('enrolled', JSON.stringify(updatedEnrolls))
    console.log('updatedEnrolls', updatedEnrolls, 'updatedUnenrolls', updatedUnenrolls)
  };

  return (
    <div className="container">
      <div>{pokemon.name}</div>
      <img src={pokemon.image} />
      <h1>Enrolled:</h1>
      <hr />
      <div>
        {enrolledState.map((lesson) => (
          <div onClick={() => Unenroll(lesson)}>{lesson}</div>
        ))}
      </div>

      <h1>Unenrolled:</h1>
      <hr />

      <div>
        {unenrolledState.map((lesson) => (
          <div onClick={() => Enroll(lesson)}>{lesson}</div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<AddLessons />, document.querySelector(".addLessons"));
