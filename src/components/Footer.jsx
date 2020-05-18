import React from 'react';

const Footer = ({ todoNum, view, setView, clearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{todoNum}</strong>
                <span> {todoNum > 1 ? "items" :"item"} left</span>
            </span>
            <ul className="filters">
                <li>
                    <a href="#/all" className={view==="all"?"selected":""} onClick={()=>setView("all")}>All</a>
                    <a href="#/active" className={view==="active"?"selected":""} onClick={()=>setView("active")}>Active</a>
                    <a href="#/completed" className={view==="completed"?"selected":""} onClick={()=>setView("completed")}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>Clear Completed</button>
        </footer>
    );
};

export default React.memo(Footer);