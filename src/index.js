import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Start from './components/Start';

if (!localStorage.tasks) {
  let taskList =
    [
      { index: 0, message: "Read a book", crossed: false },
      { index: 1, message: "Meeting with team", crossed: false },
      { index: 2, message: "Fix a printer", crossed: false },
      { index: 3, message: "Finish front-end project", crossed: true }
    ]
  localStorage.setItem("tasks", JSON.stringify(taskList))
}

if (!localStorage.city) {
  ReactDOM.render(
      <Start />,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(
      <App city={localStorage.getItem("city")} name={localStorage.getItem("name")} />,
    document.getElementById('root')
  )
}


