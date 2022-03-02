import React from 'react'
import './../../Styles/TodoApp.css'

export const TodoApp = () => {
    const [currentInput, setCurrentInput] = React.useState("")
    const [list, setList] = React.useState([]);
    const [dateValue, setDateValue] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState("")
    var CurrentDate = Date.now();
    var CurrentDateValue = CurrentDate.valueOf();

    const handleUpdate = (e) => {
        let dateValue = (e.target.value)
        setDateValue(dateValue)
        var UserDateValue = new Date(dateValue.valueOf());
        if (UserDateValue > CurrentDateValue) {
            setErrorMessage(null)
        } else {
            setErrorMessage("Due Date is Passed")
        }
    }


    const AddTodo = (e) => {
        e.preventDefault();
        const createdAt = new Date().toLocaleString();
        const newList = list;
        let date = newList.map(a => a.Date)
        if (date === null) {
            setErrorMessage("Date Not Entered")
        } else {
            setDateValue(null)
        }
        newList.unshift({ content: currentInput, createdAt, isCompleted: false, date: dateValue, errorMessage });
        setList([...newList]);
        setCurrentInput("")
        
    }

    const completedTask = (index) => {
        var newList = list
        newList[index].isCompleted = !newList[index].isCompleted
        setList([...newList])
    }

    const deleteTodo = (index) => {
        var newList = list;
        newList.splice(index, 1);
        setList([...newList]);
    }

    return (
        <div>
            <div className='outer-box'>
                <h1 style={{ fontFamily: "Open Sans", textAlign: "center" }}>ToDo</h1>
                <form className='input-box' onSubmit={AddTodo}>
                    <input className='input' onChange={(e) => { setCurrentInput(e.target.value) }} value={currentInput}></input>
                    <input type='date'
                        className='completion-date'
                        label="enter completion date"
                        onChange={(e) => handleUpdate(e)}></input>
                    <button className='add-button' onClick={AddTodo} >Add</button>

                </form>
                {list.map(({ content, createdAt, isCompleted, date, errorMessage }, index) => {
                    return (
                        <div className='todo-container' style={{border: errorMessage ? '5px solid yellow' : 'null'}}>

                            <div className='todo-main-content'>

                                <div
                                    className='todo-content'
                                    style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                                    onClick={() => { completedTask(index) }}
                                >
                                    {content}
                                </div>
                                <div className='todo-createdAt'>Created At: {createdAt}</div>
                                <div className='todo-completion-date'>Completion Date: {date}</div>
                                <div className='error-msg' >{errorMessage && (<p>{errorMessage}</p>)}</div>
                            </div>
                            <div className='del-btn' onClick={() => deleteTodo(index)}>Delete</div>
                        </div>)
                })}

            </div>
        </div>
    )
}
