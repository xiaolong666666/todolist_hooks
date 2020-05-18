import React, { useState, useCallback } from 'react';
import Item from './components/Item'
import Footer from './components/Footer'
import './App.css';

const App = () => {

  let [todoDatas,setTodoDatas] = useState([])
  let [todoNum,setTodoNum] = useState(0)
  let [view,setView] = useState("all")
  let [flag,setFlag] = useState(false)

  // 添加Todo
  let addTodo = e => {
    if(e.keyCode!==13) return false
    if(e.target.value.trim()==="") return false
    let todo = {}
    todo.id = +new Date()
    todo.value = e.target.value.trim()
    todo.hasCompleted = false
    setTodoDatas([...todoDatas,todo])
    setTodoNum(todoNum+1)
    e.target.value = ""
  }

  // 删除Todo
  let deleteTodo = id => {
    todoDatas = todoDatas.filter(todo=>{
      if (todo.id === id){
        if (!todo.hasCompleted) {
          setTodoNum(todoNum - 1)
        }
        return false
      }
      return true
    })
    setTodoDatas(todoDatas)
  }

  // 改变Todo状态
  let changeTodo = id => {
    todoDatas = todoDatas.map(todo=>{
      if(todo.id===id){
        todo.hasCompleted = !todo.hasCompleted
        if(todo.hasCompleted){
          setTodoNum(todoNum - 1)
        }else{
          setTodoNum(todoNum + 1)
        }
      }
      return todo
    })
    setTodoDatas(todoDatas)
  }

  // 修改Todo
  let editTodo = value => {
    todoDatas = todoDatas.map(todo=>{
      if(todo.id===value.id){
        todo.value = value.value
      }
      return todo
    })
    setTodoDatas(todoDatas)
  }

  // 删除已完成Todo
  let clearCompleted = () => {
    todoDatas = todoDatas.filter(todo=>!todo.hasCompleted)
    setTodoDatas(todoDatas)
  }

  // 全选或全不选
  let isAll = () => {
    flag = !flag
    setFlag(flag)
    todoDatas = todoDatas.map(todo=>{
      todo.hasCompleted = flag
      return todo
    })
    if(flag) setTodoNum(0)
    if(!flag) setTodoNum(todoDatas.length)
    setTodoDatas(todoDatas)
  }

  // 过滤Todo
  let todoDatasFilter = todoDatas.filter(todo=>{
    switch(view){
      case "all": return true
      case "active": return !todo.hasCompleted
      case "completed": return todo.hasCompleted
      default: return true
    }
  })
  
  // Todo列表
  let items = todoDatasFilter.map(todo=>{
    return <Item key={todo.id} todo={todo} deleteTodo={deleteTodo} changeTodo={changeTodo} editTodo={editTodo}/>
  })
  
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <input type="text" className="new-todo" onKeyUp={addTodo}/>
      </header>
      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" onChange={isAll}/>
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          { items }
        </ul>
      </section>
      <Footer todoNum={todoNum} view={view} setView={useCallback(setView,[])} clearCompleted={useCallback(clearCompleted,[])}/>
    </section>
  );
};

export default React.memo(App);
