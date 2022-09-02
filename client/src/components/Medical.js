import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import {format} from 'date-fns';

const Medical = () => {
    const { user, isAuthenticated } = useAuth0();
    const [medicalHistorys, setMedicalHistorys] =  useState(null);
    const [historyData, setHistoryData] = useState([]);
    const current = new Date();
    //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const date = format(new Date(),"h:m a . MMM d yyyy .")

    const handleChange = (name, value) => {
        setMedicalHistorys({...medicalHistorys, [name]: value})
        console.log(medicalHistorys)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/addHistory`, {
            method: "POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...medicalHistorys, email:user.email, date:date} ),

        })
        .then((res) => res.json())
        .then((data) => {
           // console.log(data)
           setHistoryData([...historyData, data.data ])
        })
        .catch((err) => {console.log(err)})
        
    }



    useEffect(() => {
        { isAuthenticated &&
        fetch(`/api/get-history/${user.email}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            setHistoryData(data.data)
        })
    }
    },[isAuthenticated])
    console.log(historyData)

    

    return(
        <div>
            
            <h1>Medical History</h1>
           
            <div>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name={"history"} onChange={(e) => handleChange("history",e.target.value)} ></Input>
                    <button type="Submit">Submit</button>
                    {historyData && <div>
                        {historyData.map(history => {
                            return <div>
                            <span>{date}</span>
                            <div>{history.history}</div>
                            </div>
                        })}
                    </div> }
                    
                </form>
                
            </div>

        </div>
    )


}

export default Medical;


const Input = styled.input`
width: 700px;
height: 200px;

`;