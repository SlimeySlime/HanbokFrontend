import React, { useState } from 'react'

const HanbokUpload = () =>{

    const [imageFile, setImageFile] = useState()
    const fileFolder = ''

    const fileChange = (e) => {
        console.log(e)
    }

    return(
        <div className='container'>
            <form action=""></form>
            <label>파일 업로드</label>
            <input type="file" onChange={(e) => {fileChange(e)}}/>
            <button>업로드</button>
            <img src="" alt="" />
        </div>
    )
}

export default HanbokUpload;