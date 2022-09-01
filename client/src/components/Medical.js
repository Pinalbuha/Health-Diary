import { useEffect, useState } from "react";


const Medical = () => {
    const [history, setHistory] =  useState(null);

    // useEffect(() => {
    //     fetch("/api/get-history")
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data.users)
    //         setHistory(data.users)
    //     })
    // },[])
    console.log(history)

    return(
        <div>
            <h1>Medical History</h1>
            <div>
                <form>
                    <textarea></textarea>
                </form>
            </div>
        </div>
    )


}

export default Medical;