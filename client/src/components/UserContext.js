import { createContext, useState } from "react";


export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [currentUser, setCurrent] = useState(null);

    return(
        <UserContext.Provider
        value={currentUser}
        
        >
        {children} 
        </UserContext.Provider>
    )
};

