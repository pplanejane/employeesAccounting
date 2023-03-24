import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.replace(/ /g,"").length > 3 && +this.state.salary > 0 && +this.state.salary[0] !== 0) {
                this.props.onAdd(this.state.name, this.state.salary);
                this.setState({
                name: '',
                salary: ''
            });
        } else if (this.state.name.replace(/ /g,"").length < 3) {
            alert("Please, enter a valid employee name");
            this.setState({
                name: ''
            })
        } else if (+this.state.salary <= 0 || +this.state.salary[0] === 0) {
            alert("Please, enter a valid employee salary");
        }
    }

    render() {

        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Add a new employee</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Salary $"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />
    
                    <button type="submit"
                            className="btn btn-outline-light"
                            onClick={this.onSubmit}
                            >Add</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;