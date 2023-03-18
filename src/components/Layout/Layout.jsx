// Utils
import { Outlet } from 'react-router-dom'
// Components
import Header from '../Header'
import Footer from '../Footer'
// Styles
import classes from './Layout.module.css'

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default Layout
