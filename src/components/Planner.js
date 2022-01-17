import React from 'react'
import TaskContainer from './TaskContainer.js';

class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            children: JSON.parse(localStorage.getItem("tasks")),
            numChildren: 2,
            newMessage: "What should I do next?",
            errorMessage: ""
        }
        this.onAddChild = this.onAddChild.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCross = this.handleCross.bind(this);
    }

    onAddChild = (msg) => {
        console.log(this.state.children);
        let items = [...this.state.children];
        if (items.some(function (e) {
            return e.message === msg
        })) {
            this.setState({errorMessage: "This task is already on the list!"})
        } else if (msg.length < 3) {
            this.setState({errorMessage: "Please write at least 3 letters"})
        } else if (this.state.children.length > 12) {
            this.setState({errorMessage: "You've reached max number of tasks (12)"})
        } else {
            let index = this.state.children.length + 1;
            let newArray = this.state.children.concat({index: index, message: msg, crossed: false});
            localStorage.setItem("tasks", JSON.stringify(newArray))
            this.setState({children: JSON.parse(localStorage.getItem("tasks"))})
            this.setState({errorMessage: ""})
            this.setState({newMessage: ''})
            document.getElementById("task-input").value = '';
        }
    }

    handleChange(event) {
        this.setState({newMessage: event.target.value})
    }

    handleRemove(index) {
        let newArray = this.state.children.filter((task) => task.message !== index);
        localStorage.setItem("tasks", JSON.stringify(newArray))
        this.setState({children: JSON.parse(localStorage.getItem("tasks"))})
        this.setState({errorMessage: ""})
    }

    handleCross(text) {
        let items = [...JSON.parse(localStorage.getItem("tasks"))];
        let index = items.map(function (e) {
            return e.message
        }).indexOf(text);
        let item = {...items[index]};
        item.crossed = !item.crossed;
        items[index] = item;
        localStorage.setItem("tasks", JSON.stringify(items))
        this.setState({children: JSON.parse(localStorage.getItem("tasks"))})
        this.setState({errorMessage: ""})
    }

    render() {
        return (
            <div className="main-component planner">
                <h1>To-Do List</h1>
                <form className="new-task-container" onSubmit={(e) => {
                        e.preventDefault();
                        this.onAddChild(this.state.newMessage);
                    }}>
                    <input autoComplete="off" type="text" id="task-input" placeholder="What should I do?" maxLength="45" onChange={this.handleChange}/>
                    <div className="add-task" id="addTask" onClick={() => {
                            this.onAddChild(this.state.newMessage);
                        }}>
                        <div className="add-button">Add task</div>
                    </div>
                </form>
                <div className="error-message">{this.state.errorMessage}</div>
                <TaskContainer tasks={this.state.children} handleRemove={this.handleRemove} handleCross={this.handleCross}/>
            </div>
        );
    }
}

export default Planner
