// Styles
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>
        Built and Designed by{' '}
        <a href='https://github.com/Alejandro-Cardozo' target='_blank' rel='noopener noreferrer'>
          <span className={classes.author}>Alejandro Cardozo</span>
        </a>
      </p>
    </footer>
  )
}

export default Footer
