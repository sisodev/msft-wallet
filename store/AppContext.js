import React, { useState } from "react";
import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppWrapper = ({children}) => {
    const [fullname, setFullname] = useState("")
    const [verificationId, setVerificationId] = useState("");
    const [issuanceId, setIssuanceId] = useState("");
    let state = {verificationId, issuanceId, fullname, setFullname, setVerificationId, setIssuanceId}
   

    return(
        <AppContext.Provider value={state} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext= () => {
    return useContext(AppContext)
}

