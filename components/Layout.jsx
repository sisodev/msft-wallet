import Footer from "./Footer"
// import MyHeader from "./MyHeader"
import { useRouter } from 'next/router';
// import Navbar from "./Navbar"
import MicrosoftHeader from "./MicrosoftHeader";

const Layout = ({children}) => {
    const router = useRouter();

    return (
        <div>
            <MicrosoftHeader/>
            {children}
            {/* <Footer/> */}
        </div>
    )
}

export default Layout