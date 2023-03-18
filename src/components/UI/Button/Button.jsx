// Styles
import classes from './Button.module.css'

const Button = (props) => {
  const btnClasses = (() => {
    switch (props.size) {
      case 'sm':
        return `${classes.btn} ${classes['btn-sm']}`
      case 'lg':
        return `${classes.btn} ${classes['btn-lg']}`
      default:
        return `${classes.btn}`
    }
  })()

  return (
    <button {...props} className={btnClasses}>
      {props.children}
    </button>
  )
}

export default Button
