import { useState } from "react"


const UploadFile = () => {
    const [selectedFile, setselectedFile] = useState({preview: '' , data: ''});

    // const handleFile = (e) => {
    //     const img = {
    //         preview: URL.createObjectURL(e.target.files[0]),
    //         data: e.target.files[0]
    //     }
    //     setselectedFile(img)

    // }

    // const handleUpload = (e) => {
    //     e.preventDefault();
    //     let formData = new FormData();
    //     formData.append('file', selectedFile.data)
    //     console.log(formData)
    //     fetch("/api/image" , {
    //         method: 'POST',
    //         body: formData,
    //     })
    // }

    
    return (
        <div>
            
            <input type="file"></input>
            <button type="submit">Submit</button>
            
        </div>
    )
}


export default UploadFile;