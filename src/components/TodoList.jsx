import TodoItem from "./TodoItem"

const TodoList = (props) => {
  
  const {
    tasks = [],
    filteredTasks,
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = props

	const hasTasks = tasks.length > 0;
  const isEmpltyFilteredTasks = filteredTasks?.length === 0

	if(!hasTasks) {
		return (
			<div className="todo__empty-message">There are no tasks yet!</div>
		)
	}

  if (hasTasks && isEmpltyFilteredTasks) {
    return (
			<div className="todo__empty-message">Tasks not found :/ </div>
		)
  }

	return (
		<ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem 
          className="todo-item"
          key={task.id}
          {...task} 
          ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}    
    </ul>
	)

}

export default TodoList