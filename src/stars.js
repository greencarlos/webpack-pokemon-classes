import React, { useState } from "react";
import ReactDOM from "react-dom";

const Stars = () => {
  const [value, setValue] = useState(0);

  const stars = [1, 2, 3, 4, 5].map((star, i) => {
    let iconClass = star <= value ? "fas" : "far";

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
    <div>
      <h1>You are giving {value} stars</h1>
      <br />
      {stars}
    </div>
  );
};

ReactDOM.render(<Stars />, document.querySelector(".stars"));
