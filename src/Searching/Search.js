import React, {Component, useState} from 'react'
import axios from 'axios'
import '../bootstrap/bootstrap.css'
// import serverlink from './AxiosLink'

const Search = ()  => {

    const [keyword, setKeyword] = useState('')
    const [storeItem, setStoreItem] = useState([])
    const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'

    const keywordChange = (e) => {
        console.log('e', e)
        console.log('e.target', e.target.value);
        setKeyword(e.target.value);
    }

    const pathTest = () => {
        console.log('search path : ', searchPath);
        console.log('NODE_ENV : ', process.env.NODE_ENV );
    }

    const search = () => {
        console.log('search', keyword);
        axios.get(searchPath, {      // http://localhost:3000/search/Hanboks -> /search
            params: {
                category: 'NaverStore',
                keyword,    // keyword: keyword 같은듯?
            }
        })
        .then((res) => {
            setStoreItem(res.data);
            // bs_count, bs_gubun, bs_gsname1~5, bs_bigo(size), bs_gsMkaer1~5, bs_barcode1~5, bs_gsKind1~5, 
            console.log(res);
        })
    }

    return(
        <div className='container-fluid mt-3'>
            <div className='col'>
                <p>current version : {process.env.REACT_APP_SEARCH_PATH}</p>
                <form className='form-group'>
                    <label for='keyword'>키워드 (지금은 블로그 검색) </label>
                    <input type='text' name='keyword' className='form-control' onChange={(e) => {keywordChange(e)}}></input>
                </form>
                <button onClick={search} className='btn btn-primary mt-3 mb-4'>검색</button>
                
                {storeItem.map((item, index) => 
                    <li>{item.bs_gsname1} / {item.bs_gsname2} / {item.bs_gsname3} </li>
                )}
            </div>
        </div>
    )
}

export default Search