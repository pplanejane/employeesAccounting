import './app-header-info.css';

const AppHeaderInfo = ({increased, employees}) => {
    return (
        <div className="app-info">
            <h1>|Some company| Employees Accounting</h1>
            <h2>Total number of employees: {employees}</h2>
            <h2>Number of employees who will receive a cash bonus: {increased}</h2>
        </div>
    )
}

export default AppHeaderInfo;