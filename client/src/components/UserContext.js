import { createContext, useState } from "react";


export const UserContext = createContext(null);

export const UserProvider = ( {children}) => {
    const [historyData, setHistoryData] = useState([]);


return(
    <UserContext.Provider 
    value={
       { historyData,
        setHistoryData
    
    }
    }
    >
    {children}

    </UserContext.Provider>
)
}