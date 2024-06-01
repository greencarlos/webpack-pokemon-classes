import React, { useState } from "react";
import ReactDOM from "react-dom";

const Stars = () => {
  const [value, setValue] = useState(0);
  const [click, setClick] = useState(false);

  function Header({ click, value }) {
    if (click) {
      return <h1>You have given {value} stars!</h1>;
    }
    return <h1>You are giving {value} stars</h1>;
  }

  const stars = [1, 2, 3, 4, 5].map((star, i) => {
    let iconClass = star <= value ? "fas" : "far";

    if (click) {
      return <i className={`${iconClass} fa-star star`} key={star}></i>;
    }

    return (
      <i
        className={`${iconClass} fa-star star`}
        key={star}
        onMouseMove={() => {
          setValue(star);
        }}
      ></i>
    );
  });

  return (
    <div
      onClick={() => {
        setClick(true);
      }}
      onMouseLeave={() => {
        setClick(false);
      }}
    >
      <Header value={value} click={click} />
      <br />
      {stars}
    </div>
  );
};

ReactDOM.render(<Stars />, document.querySelector(".stars"));
