import { memo } from 'react'

const TodoInfo = (props) => {
	console.log('TodoInfo')
	const {
		done, 
		total,
		onDeleteAllButonClick,
	} = props

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">{done} / {total} </div>
			<button 
			className="todo__delete-all-button" 
			type="button"
			onClick={onDeleteAllButonClick}
			>
				Delete all
			</button>
		</div>
	)
}

export default memo(TodoInfo)