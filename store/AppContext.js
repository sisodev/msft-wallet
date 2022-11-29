import React, { useState } from "react";
import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppWrapper = ({children}) => {

    const [verificationId, setVerificationId] = useState("");
    const [issuanceId, setIssuanceId] = useState("");
    let state = {verificationId: "", issuanceId: "", setVerificationId, setIssuanceId}
   

    return(
        <AppContext.Provider value={state} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext= () => {
    return useContext(AppContext)
}

