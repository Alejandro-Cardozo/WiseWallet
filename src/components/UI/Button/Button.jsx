// Styles
import classes from './Button.module.css'

const Button = (props) => {
  const btnClasses = props.styled ? props.styled.map((style) => classes[style]) : null

  return (
    <button {...props} className={`${btnClasses ? btnClasses.join(' ') : ''} ${classes.btn}`}>
      {props.children}
    </button>
  )
}

export default Button
