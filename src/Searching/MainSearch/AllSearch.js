import React, { useEffect, useState } from "react"
import styled from "styled-components";
import axios from "axios";

const AllSearch = () => {

    const [keywords, setKeywords] = useState([])

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    function search() {
        axios.get(searchPath + '/all', {
            params: {
                keywords : keywords.split(' ')
            }
        }).then((result) => {
            console.log(result)
        })
    }

    useEffect(() => {
        try{
            console.log(keywords.split(' '))
        }catch(e){
            console.log(e)
        }
    }, [keywords])

    function onKeyPress(key){
        if(key === 'Enter'){
            search()
        }
    }

    return(
        <div>
            {/* <label htmlFor="">통합 검색</label> */}
            <SearchLabel className="px-2">통합 검색</SearchLabel>
            <input type="text" id="searchKeyword" 
            onChange={(e) => {setKeywords(e.target.value)}}
            onKeyPress={(e) => onKeyPress(e.key)}/>
        </div>
    )
}

const SearchLabel = styled.label`
    color : white
`

export default AllSearch;
