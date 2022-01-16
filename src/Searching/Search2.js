import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Search2 = () => {

    const [hanbokList, setHanbokList] = useState([]);
    const [hanbokName, setHanbokName] = useState('');
    const [hanbokType, setHanbokType] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [currentItem, setCurrentItem] = useState('');

    // 데이터 불러오기
    useEffect(() => {
        axios.get('http://localhost:3000/search')
        .then((result) => {
            setHanbokList(result.data);
            setSearchList(result.data);
        })
    }, [])

    // 검색 버튼 클릭 이벤트
    const searchHanbok = () => {
        const nameReg = new RegExp(`${hanbokName.trim()}`, 'gi');
        let searchedList = hanbokList.filter(item => nameReg.test(item.gs_name));
        const typeReg = new RegExp(`${hanbokType.trim()}`, 'gi');
        searchedList = searchedList.filter(item => typeReg.test(item.gs_kind));

        setSearchList(searchedList);
    }

    // regex
    const keywordChange = (keyword) => {
        const reg = new RegExp(`${hanbokName}`, 'gi');
        const searchedList = hanbokList.filter(item => reg.test(item.gs_name));
        setSearchList(searchedList);
    }

    const updateHanbok = (e) => {
        if (checkPostData(currentItem.gs_name, currentItem.gs_kind, currentItem.gs_maker) === true) {

            axios.post('http://localhost:3000/search', {
                method : e.target.id,
                id : currentItem.gs_Count,
                maker : currentItem.gs_maker,
                position : currentItem.gs_position,
                name : currentItem.gs_name,
                type : currentItem.gs_kind,
            }).then((result) => {
                console.log(result)
                setHanbokList(result.data)
            })
        }else{
            window.alert('중복 항목이 있습니다.');
        }
    }

    useEffect(() => {
        const nameReg = new RegExp(`${hanbokName.trim()}`, 'gi');
        let searchedList = hanbokList.filter(item => nameReg.test(item.gs_name));
        const typeReg = new RegExp(`${hanbokType.trim()}`, 'gi');
        searchedList = searchedList.filter(item => typeReg.test(item.gs_kind));

        setSearchList(searchedList);
    }, [hanbokList])

    const deleteHanbok = () => {
        // 똑같은데 window.confirm
        window.confirm('정말 삭제하시겠습니까?');
    }

    const checkPostData = (name, type, maker) => {
        let validation = true
        hanbokList.forEach(item => {
            if (item.gs_name === name && item.gs_kind === type && item.gs_maker === maker) {
                console.log('중복이 있습니다.');
                validation =  false
            }
        });
        return validation;
    }
    
    const changeCurrentItem = (e) => {
        if (e.target.id === 'maker') {
            setCurrentItem({
                ...currentItem,
                gs_maker : e.target.value,
            })
        }else if (e.target.id === 'position') {
            setCurrentItem({
                ...currentItem,
                gs_position : e.target.value,
            })
        }else if (e.target.id === 'name') {
            setCurrentItem({
                ...currentItem,
                gs_name : e.target.value,
            })
        }else if (e.target.id === 'type') {
            setCurrentItem({
                ...currentItem,
                gs_kind : e.target.value,
            })
        }

        console.log(e.target.id);

    }
    
    const enterSearch = (e) => {
        if (e.key === 'Enter') {
            searchHanbok();
        }
    }
    
    return(
        <div className='container-fluid'>
            <div className='row py-3'>
                <div className='col-sm-2'>
                    <input className='form-control col-auto' value={hanbokName} 
                    onChange={(e) => {setHanbokName(e.target.value)}}
                    onKeyPress={(e) => {enterSearch(e)}}></input>
                    <small className='form-text text-muted'>한복 이름</small>
                </div>
                <div className='col-sm-2'>
                    <input className='form-control col-auto' value={hanbokType} 
                    onChange={(e) => {setHanbokType(e.target.value)}}
                    onKeyPress={(e) => {enterSearch(e)}}></input>
                    <small className='form-text text-muted'>한복 종류</small>
                </div>
                <button className='btn btn-primary' onClick={() => {searchHanbok()}}>검색</button>
                <div className='col'>
                    <input type='text' name='maker' id='maker' value={currentItem.gs_maker} onChange={(e) => changeCurrentItem(e)}></input>
                    <input type='text' name='positon' id='positon' value={currentItem.gs_position} onChange={(e) => changeCurrentItem(e)}></input>
                    <input type='text' name='name' id='name' value={currentItem.gs_name} onChange={(e) => changeCurrentItem(e)}></input>
                    <input type='text' name='type' id='type' value={currentItem.gs_kind} onChange={(e) => changeCurrentItem(e)}></input>
                    <button id='update' onClick={(e) => {updateHanbok(e)}}>수정</button>
                    <button id='delete' onClick={(e) => {deleteHanbok(e)}}>삭제</button>
                    <button id='add' onClick={(e) => {updateHanbok(e)}}>추가</button>
                </div>
            </div>
            
            
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th></th>
                        <th scope='row'>매입처</th>
                        <th scope='row'>위치</th>
                        <th scope='row'>이름</th>
                        <th scope='row'>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {hanbokList.filter((value) => 
                        // const reg = new RegExp(`${hanbokName}`, 'gi');
                        testingKeyword(value.gs_name)
                    ).map((value, index) => 
                    <tr key={value.gs_count} onClick={() => {setCurrentItem(value);}}>
                        <td>{index + 1}. </td>
                        <td>{value.gs_maker}</td>
                        <td>{value.gs_position}</td>
                        <td>{value.gs_name}</td>
                        <td>{value.gs_kind}</td>
                    </tr>
                    )} */}
                    {searchList.map((value, index) =>
                        <tr key={value.gs_count} onClick={() => {setCurrentItem(value);}}>
                            <td>{index + 1}. </td>
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
