import React, { useState } from "react";
import ReactDOM from "react-dom";

const titleInfo = [
  { title: "Todo", color: "lightblue" },
  { title: "Doing", color: "lightgreen" },
  { title: "Done", color: "orange" },
  { title: "Approved", color: "blueviolet" },
];

const Board = ({ data, boardId, onDataChange, moveTodoLeft, moveTodoRight }) => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState(data);
  const { title, color } = titleInfo[boardId];

  const addTodo = () => {
    const newDataValues = [...todos, todoValue];
    setTodos(newDataValues);
    setTodoValue(todoValue);
    onDataChange(newDataValues);
  };

  const updateTextArea = (e) => {
    setTodoValue(e.target.value);
  };

  const components = todos.map((todo, i) => {
    const deleteTodo = () => {
      const result = confirm(`Are you sure you want to delete ${todo}?`);
      if (!result) {
        return;
      }

      const newDataValues = [...todos];
      newDataValues.splice(i, 1);
      setTodos(newDataValues);
      onDataChange(newDataValues);
    };

    const moveLeft = () => {
      const newDataValues = [...todos];
      newDataValues.splice(i, 1);
      setTodos(newDataValues);
      onDataChange(newDataValues);
      moveTodoLeft(todo)
    };

    const moveRight = () => {
      const newDataValues = [...todos];
      newDataValues.splice(i, 1);
      setTodos(newDataValues);
      onDataChange(newDataValues);
      moveTodoRight(todo)
    };

    const Arrow = ({ className, onClick, content }) => {
      return (
        <div className={className} onClick={onClick}>
          {content}
        </div>
      );
    };

    return (
      <div className="todoContainer kanbanRow" key={i}>
        {boardId > 0 && <Arrow className="left arrow" onClick={moveLeft} />}
        <h4 className="title todo" onClick={deleteTodo}>
          {todo}
        </h4>
        {boardId < 3 && <Arrow className="right arrow" onClick={moveRight} />}
      </div>
    );
  });

  return (
    <div className="todoListContainer">
      <h1 className="title" style={{ backgroundColor: color }}>
        {title}
      </h1>
      <div className="inputContainer">
        <textarea onChange={updateTextArea}></textarea>
        <button onClick={addTodo}>Submit</button>
        {components}
      </div>
    </div>
  );
};

const Kanban = (props) => {
  let initialBoardsData = [[], [], [], []];
  if (props.data && props.data.length === 4) {
    initialBoardsData = props.data;
  }

  const [boardsData, setBoardsData] = useState(initialBoardsData);

  const boards = boardsData.map((boardInfo, i) => {
    const onDataChange = (newData) => {
      boardsData[i] = newData;
      window.localStorage.setItem("kanban", JSON.stringify(boardsData));
    };

    const moveTodoRight = (value) => {
      boardsData[i + 1].push(value);
      setBoardsData([...boardsData]);
      window.localStorage.setItem("kanban", JSON.stringify(boardsData));
    };

    const moveTodoLeft = (value) => {
      boardsData[i - 1].push(value);
      setBoardsData([...boardsData]);
      window.localStorage.setItem("kanban", JSON.stringify(boardsData));
    };

    return (
      <Board
        data={boardInfo}
        key={i}
        boardId={i}
        onDataChange={onDataChange}
        moveTodoLeft={moveTodoLeft}
        moveTodoRight={moveTodoRight}
      />
    );
  });

  return <div className="kanbanRow">{boards}</div>;
};

ReactDOM.render(<Kanban />, document.querySelector(".kanban"));
