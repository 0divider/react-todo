const Button = (props) => {

	const {
		type = button,
		className = '',
		children
	} = props

	return(
		<button 
			className={`button ${className}`} 
			type={type}>
				{children}
		</button>
	)
}

export default Button