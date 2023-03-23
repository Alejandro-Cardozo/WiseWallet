// Utils
import { Outlet } from 'react-router-dom'
// Components
import Header from '../Header'
import Footer from '../Footer'
// Styles
import classes from './Layout.module.css'

const Layout = () => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.body}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default Layout
