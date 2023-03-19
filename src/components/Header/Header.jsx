// Utilities
import { Link } from 'react-router-dom'
// Styles
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <h1><Link to='/'>LOGO</Link></h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Wallets</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
