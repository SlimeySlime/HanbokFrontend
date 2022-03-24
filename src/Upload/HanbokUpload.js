import axios from 'axios'
import React, { useState, useEffect } from 'react'

const HanbokUpload = () =>{
    const [image64, setImage64] = useState([])
    const [imageFile, setImageFile] = useState([])
    const fileFolder = ''

    const imagePath = process.env.NODE_ENV === 'production' ? '/hanbok' : 'http://localhost:3000/hanbok'

    const fileChange = (e) => {
        console.log(e)
        console.log(e.target.files)
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            const base64 = reader.result
            if (base64) {
                // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2YAAAHpCAYAAADprC/aAAAACX...
                let base = base64.toString()
                // setImage64([...image64, base])
                setImage64([base])
            }
        }
    }

    useEffect(() => {
        console.log('imagepath axios')
        getHanbokImage()
        // axios.get(imagePath, {
        //     responseType:'blob'
        // })
        // .then((result) => {
        //     console.log(result)
        //     // console.log('imagepath get')
        //     const reader = new FileReader()
        //     reader.readAsBinaryString(result.data)
        //     reader.onloadend = () => {
        //         const base = reader.result
        //         if (base) {
        //             console.log(base)
        //             setImageFile(base.toString())
        //         }
        //     }
        //     // setImageFile(result.data)
        // })
        // 
    }, [])

    const getHanbokImage = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', imagePath);
        xhr.responseType = 'blob'
        xhr.send()
        xhr.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200){
                let url = window.URL || window.webkitURL
                let imgsrc = url.createObjectURL(this.response)
                setImageFile(imgsrc)
            }else{
                console.log('!200!')
            }
        }

    }

    // 저장경로 : 해경/치마/수국은색.jpg -> 매입처/종류/이름
    // 신규품목 등록은 : 분류(2), 위치, 제조사(1), 품명(3), 수량, (바코드 자동 생성)
    
    return(
        <div className='container mt-2'>
            <form action=""></form>
            <label>파일 업로드</label>
            <input type="file" onChange={(e) => {fileChange(e)}}/>
            <button>업로드</button>
            {image64.map((item) => 
                <img className='d-block w-100' src={item} alt='업로드한복'></img>
            )}
            <img src={imageFile} alt='routerhanbok'></img>
        </div>
    )
}

export default HanbokUpload;