import { memo, useContext, useMemo } from 'react'
import { TasksContext } from '../context/tasksContext'

const TodoInfo = () => {
	const {
		tasks = [], 
		deleteAllTasks,
	} = useContext(TasksContext) || {}

	const total = tasks.length
	const hasTasks = total > 0
	const done = useMemo(()=>{
    return tasks.filter((item) => item.isDone).length
  }, [tasks])

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">{done} / {total} </div>
			<button 
			className="todo__delete-all-button" 
			type="button"
			onClick={deleteAllTasks}
			disabled={!hasTasks}
			>
				Delete all
			</button>
		</div>
	)
}

export default memo(TodoInfo)