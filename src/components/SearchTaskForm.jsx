import Field from "./Field"

const SearchTaskForm = (props) => {

	const {
		searchQuery,
		setSearchQuery		
	} = props

	return(
		<form className="todo__form" onSubmit={(event) => event.preventDefault()}>
			
			<Field
				type="search"
				className="todo__field"
				id="search-task"
				label="Search Task"
				value={searchQuery}
				onInput={(event) => setSearchQuery(event.target.value)}
			/>

			
		</form>
	)
}

export default SearchTaskForm