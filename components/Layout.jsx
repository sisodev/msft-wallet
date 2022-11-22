import Footer from "./Footer"
import MyHeader from "./MyHeader"
// import Navbar from "./Navbar"

const Layout = ({children}) => {
    return (
        <div>
            <MyHeader/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout