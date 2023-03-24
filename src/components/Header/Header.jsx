// Utilities
import { Link } from 'react-router-dom'
// Styles
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>
          <img className={classes.logo__image} src='/favicon.svg' alt='wisewalletlogo' />
          <h1 className={classes.logo__title}>WiseWallet</h1>
        </div>
      </Link>
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
