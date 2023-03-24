import { Component } from 'react';

import AppHeaderInfo from '../app-header-info/app-header-info';
import AppSearchPanel from '../app-search-panel/app-search-panel'
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: "Justin H.", salary: 7500, increase: false, rise: false, id: 1},
                {name: "Anthony D.", salary: 5500, increase: true, rise: false, id: 2},
                {name: "Mark W.", salary: 6000, increase: false, rise: false, id: 3},
                {name: "Andrew R.", salary: 4300, increase: false, rise: true, id: 4},
            ],
            term: "",
            filter: "all"
        }
        this.maxId = 5
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onChangeSalary = (id, amount) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: amount}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0 || term.replace(/ /g, "").length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'promotion':
                return items.filter(item => item.rise);
            case 'over1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    
        return (
            <div className="app">
                <AppHeaderInfo
                    employees={employees}
                    increased={increased} />

                <div className="app-search-panel">
                    <AppSearchPanel
                    onUpdateSearch ={this.onUpdateSearch} />
                    <AppFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect} />
                </div>
                
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary} />
                <EmployeesAddForm
                    onAdd={this.addItem} />
            </div>
        );
    }

}

export default App;