import React, { useState, useRef } from 'react';

const Item = ({ todo, deleteTodo, changeTodo, editTodo}) => {
    let [edit,setEdit] = useState(false)
    let [flag,setFlag] = useState(true)
    let completed = todo.hasCompleted ? "completed" : ""
    let className = edit ? completed + " editing" : completed
    let myInput = useRef();

    // 显示隐藏文本框
    let handleDoubleClick = () => {
        setEdit(true)
        myInput.current.value = todo.value
        setTimeout(() => myInput.current.focus(), 10 )
    }

    return (
        <li className={className}>
            <div className="view">
                <input type="checkbox" className="toggle" onChange={() => { changeTodo(todo.id) }} checked={todo.hasCompleted}/>
                <label onDoubleClick={handleDoubleClick}>{todo.value}</label>
                <button className="destroy" onClick={() => { deleteTodo(todo.id) }}></button>
            </div>
            <input type="text" className="edit" ref={myInput}
                onKeyUp={e=>{
                    if(e.target.value.trim()==="") return false
                    if(e.keyCode!==13 && e.keyCode!==27) return false
                    if(e.keyCode===13){
                        todo.value = e.target.value
                        editTodo(todo)
                        setEdit(false)
                    }
                    if(e.keyCode===27){
                        setEdit(false)
                        setFlag(false)
                        setTimeout(() => setFlag(true), 10 )
                    }
                }}
                onBlur={e=>{
                    if(flag){
                        todo.value = e.target.value
                        editTodo(todo)
                        setEdit(false)
                    }
                }}
            />
        </li>
    );
};

export default React.memo(Item);