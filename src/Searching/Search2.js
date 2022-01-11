import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Search2 = () => {

    const [hanbokList, setHanbokList] = useState([]);
    const [hanbokName, setHanbokName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/search')
        .then((result) => {
            setHanbokList(result.data)
        })
    }, [])

    // 검색 버튼 클릭 이벤트
    const searchHanbok = () => {
        axios.get('http://localhost:3000/search', {
            params : {
                name : hanbokName
            }
        })
        .then((result) => {
            // gs_name, kind, position, maker
            setHanbokList(result.data)
            console.log(result);
        })
    }
    
    return(
        <div className='container-fluid'>
            <h1>Search</h1>
            <p>한복 서치</p>
            <div className='row'>
                <label for='HanbokName'>한복 이름</label>
                <input className='form-control col-auto' value={hanbokName} 
                onChange={(e) => {setHanbokName(e.target.value)}}></input>
                <button className='btn btn-primary' onClick={() => {searchHanbok()}}>검색</button>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='row'>매입처</th>
                        <th scope='row'>위치</th>
                        <th scope='row'>이름</th>
                        <th scope='row'>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {hanbokList.map((value) => 
                        <tr>
                            <td>{value.gs_maker}</td>
                            <td>{value.gs_position}</td>
                            <td>{value.gs_name}</td>
                            <td>{value.gs_kind}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
    )
}
export default Search2;
