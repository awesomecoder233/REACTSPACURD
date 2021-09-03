import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: [], 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
    }
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        console.log('onChange', this.state.name);
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                console.log('from handle submit', response);
                this.setState({
                   tasks : [response.data, ...this.state.tasks] 
                });
                this.setState({
                   name: '' 
                });
            });
    }
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <p>{task.name}</p>
                </div>
            </div>
        ));
    }
    // get all tasks from backend
    getTasks(){
        axios.get('/tasks').then((
                response
            ) => this.state({
                tasks: [...response.data.tasks]
            })
        );
    }
    //lifecycle method
    componentWillMount() {
        this.getTasks();
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create Task</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea onChange={this.handleChange} value={this.state.name} className="form-control" rows="5" placeholder="Create a new task" required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Create Task</button>
                                </form>
                                <hr />
                                {this.renderTasks()}    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}