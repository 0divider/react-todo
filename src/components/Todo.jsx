import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo =  () => {

  const [tasks, setTasks] = useState([
    {id: 'task-1', title: 'Buy milk', isDone: false},
    {id: 'task-2', title: 'Buy ilk', isDone: true},
    {id: 'task-3', title: 'Buy asasail', isDone: true},
  ])

  const [newTaskTitle, setNewTaskTitle] = useState('')

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

  const filterTasks = (query) => {
    console.log(`Поиска по ${query}`)
  }

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    }
  }

  useEffect(()=> {
    console.log('Saved because its changed', tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks] )

	return(
		<div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle} 
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo 
        total={tasks.length}
        done={doneTasksount} 
        onDeleteAllButonClick={deleteAllTasks}
      />      
      <TodoList 
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete} 
      />      
    </div>
	)
}

export default Todo