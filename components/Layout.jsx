import Footer from "./Footer"
import MyHeader from "./MyHeader"
import { useRouter } from 'next/router';
// import Navbar from "./Navbar"

const Layout = ({children}) => {
    const router = useRouter();

    return (
        <div>
            {router.pathname !=="/issuer" && <MyHeader/>}
            {children}
            {/* <Footer/> */}
        </div>
    )
}

export default Layout