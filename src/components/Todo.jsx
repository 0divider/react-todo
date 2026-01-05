import { useState, useEffect, useRef } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

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

  //const [newTaskTitle, setNewTaskTitle] = useState('')
  const newTaskInputRef = useRef(null)
  console.log('newTaskInputRef:', newTaskInputRef)

  const [searchQuery, setSearchQuery] = useState('')

  const doneTasksount = tasks.filter((item) => item.isDone).length
  
  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure?")
    if (isConfirmed) {
      setTasks([])
    }
  }

  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id != taskId)
    )
  }

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === taskId) {
          return {...task, isDone}
        }
        return task
      })
    )
  }
 

  const addTask = () => {

    const newTaskTitle = newTaskInputRef.current.value

    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }
      setTasks([...tasks, newTask])
      //setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.value = ''
    }
    console.log('newTaskInputRef:', newTaskInputRef)
  }

  useEffect(()=> {    
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks] )

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0 
  ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) 
  : null

	return(
		<div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask={addTask}
        // newTaskTitle={newTaskTitle}
        // setNewTaskTitle={setNewTaskTitle} 
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
      <TodoList 
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete} 
      />      
    </div>
	)
}

export default Todo