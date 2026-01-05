const Button = (props) => {

	const {
		type = 'button',
		className = '',
		onClick,
		children
	} = props

	return(
		<button 
			className={`button ${className}`} 
			onClick={onClick}
			type={type}>
				{children}
		</button>
	)
}

export default Button