import { withRouter } from "next/router"

function Issuer({router}) {
    return(
        <div>
            <h1>{router.query.name}</h1>
        </div>
    )
    
}

export default withRouter(Issuer)