import React, { useState } from "react";
import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppWrapper = ({children}) => {
    const [fullname, setFullname] = useState("")
    const [verificationId, setVerificationId] = useState("");
    const [issuanceId, setIssuanceId] = useState("");
    const [hostname, setHostname] = useState("");
    let state = {verificationId, issuanceId, fullname, hostname, setFullname, setVerificationId, setIssuanceId, setHostname}
   

    return(
        <AppContext.Provider value={state} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext= () => {
    return useContext(AppContext)
}

