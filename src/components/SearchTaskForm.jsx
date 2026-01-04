import Field from "./Field"

const SearchTaskForm = (props) => {

	const {
		onSearchInput
	} = props

	return(
		<form className="todo__form" onSubmit={(event) => event.preventDefault()}>
			
			<Field
				type="search"
				className="todo__field"
				id="search-task"
				label="Search Task"
				onInput={(event) => onSearchInput(event.target.value)}
			/>

			
		</form>
	)
}

export default SearchTaskForm