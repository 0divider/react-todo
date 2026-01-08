import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"
import { TasksContext } from "../context/tasksContext"

const Todo =  () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return [
      {id: 'task-1', title: 'Buy milk', isDone: false},
      {id: 'task-2', title: 'Buy ilk', isDone: true},  
    ]
  })

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({isDone})=>!isDone)?.id

  
  
  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?")
    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }, [])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(prevTasks =>
      prevTasks.map((task) => {
        if(task.id === taskId) {
          return {...task, isDone}
        }
        return task
      })
    )
  }, [])
 

  const addTask = useCallback(() => {    

    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }
      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')      
      newTaskInputRef.current.focus()
    }    
  }, [newTaskTitle])

  useEffect(()=> {    
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks] )

  useEffect(()=>{
    newTaskInputRef.current.focus()
  },[])

  
  const filteredTasks = useMemo( () => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0 
    ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) 
    : null
  }, [searchQuery, tasks])

	return(
		<TasksContext.Provider
      value={{
        tasks, 
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
      }}
    >
      <div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm 
          addTask={addTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle} 
          newTaskInputRef={newTaskInputRef}
        />
        <SearchTaskForm 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}        
        />
        <TodoInfo />      
        <Button onClick={ () => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          Scroll to first uncomplete task
        </Button>
        <TodoList />      
      </div>
    </TasksContext.Provider>
	)
}

export default Todo