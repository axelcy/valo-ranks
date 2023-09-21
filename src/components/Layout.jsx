import { Outlet } from "react-router-dom"
import './styles/Layout.css'

function Layout() {
  return (
    <>
        <nav>
            <h1>Navbar</h1>
        </nav>
        <Outlet />
    </>
  )
}

export default Layout
