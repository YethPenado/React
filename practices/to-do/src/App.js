import React from 'react';
import './App.css';
import Sidebar from './Sidebar';

class App extends React.Component {
  constructor() {
    const todos = localStorage.getItem('todos')
    super()
    this.state = {
      list: todos ? JSON.parse(todos) : [],
      openModal: false,
      i: 0
    }
  }

  render() {
    return <div key="wrapper" className="wrapper">
      <Sidebar goto={i => {
        this.setState({ i })
        console.log(this.state.i);
      }}

        tabs={[{
          content: 'Create new task', href: '#'
        },
        {
          content: 'All tasks', href: '#'
        },
        {
          content: 'Pending Tasks', href: '#'
        },
        {
          content: 'Completed tasks', href: '#'
        }
        ]}
      />
      {
        this.state.openModal ?
          <div className="modal">
            <p className="modal__text">Your task has been added successfully!</p>
            <button onClick={() => {
              this.setState({ openModal: false });
            }} className="modal__btn buttons modal__btn--right">Add other task</button>
            <button onClick={() => {
              this.setState({ openModal: false, i: 1 })
            }} className="modal__btn buttons">Show tasks</button>
          </div> : null
      }
      {[
        <form key="create">
          <label>Task name</label>
          <input name="taskName" type="text" />

          <label>Deadline</label>
          <input name="deadline" type="date" />

          <label>Time</label>
          <input name="time" type="time" />

          <label>Task description</label>
          <textarea name="taskDescription" type="text" rows="10" cols="70" />

          <button onClick={(e) => {
            e.preventDefault();
            const data = { started: new Date().getFullYear() };
            [...e.target.parentElement.querySelectorAll('input, textarea')].forEach((input) => {
              data[input.name] = input.value
            });
            this.state.list.push(data);
            this.setState({ list: this.state.list, openModal: true });
            localStorage.setItem('todos', JSON.stringify(this.state.list));

          }} type="submit" className="tasks-create buttons">Create ToDo</button>
        </form>,

        <div key="all" className="tabs">
          <h2>All tasks</h2>
          {this.state.list.map(props => {
            return (
              <div key={props.taskName} className="all-tasks__container">
                <h3>{props.taskName}</h3>
                <p className="all-tasks__text">{props.taskDescription}</p>
                <p className="all-tasks__text"><span>Created: </span>{props.started}</p>
                <p className="all-tasks__text"><span>Hour: </span>{props.time}</p>
                <p className="all-tasks__text"><span>Deadline: </span>{props.deadline}</p>
              </div>
            );
          })}
        </div>,
        <div key="pending" className="tabs">
          <h2>Pending Tasks</h2>
        </div>,
        <div key="completed" className="tabs">
          <h2>Completed tasks</h2>
        </div>
      ][this.state.i]}
    </div>
  }
}

export default App;