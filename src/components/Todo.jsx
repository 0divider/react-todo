import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"
import Button from "./Button"

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

  const doneTasksount = useMemo(()=>{
    return tasks.filter((item) => item.isDone).length
  }, [tasks])
  
  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?")
    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id != taskId)
    )
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === taskId) {
          return {...task, isDone}
        }
        return task
      })
    )
  }, [tasks])
 

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
      <TodoInfo 
        total={tasks.length}
        done={doneTasksount} 
        onDeleteAllButonClick={deleteAllTasks}
      />      
      <Button onClick={ () => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        Scroll to first uncomplete task
      </Button>
      <TodoList 
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete} 
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
      />      
    </div>
	)
}

export default Todo