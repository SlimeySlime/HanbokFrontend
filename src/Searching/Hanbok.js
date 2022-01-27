import React, {useState, useEffect} from 'react'
import axios from 'axios';
import HanbokItem from './HanbokItem';
import styled from 'styled-components';

const Hanbok = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    // const [keyword, setKeyword] = useState( ['' , ''] ) 
    const [hanboks, setHanboks] = useState([]);
    const [searchList, setSearchList] = useState([]);

    const [currentItem, setCurrentItem] = useState({});
    const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'

    useEffect(() => {
        // searchAll
        axios.get(searchPath)
        .then((result) =>{
            setHanboks(result.data);
            setSearchList(result.data);
        })

    },[])

    // filter식 검색
    const search2 = () => {
        const nameReg = new RegExp(`${name}`, 'gi');
        let searched = hanboks.filter(item => nameReg.test(item.gs_name));
        const typeReg = new RegExp(`${type}`, 'gi');
        searched = searched.filter(item => typeReg.test(item.gs_kind));
        setSearchList(searched);
    }

    const search = () => {
        // name.replace(' ', '')
        // type.replace(' ', '')
        name.trim()
        type.trim()
        axios.get(searchPath, {     // http://localhost:3000/search -> /search
            params: {
                name,
                type
            }
        }).then((res) =>{
            setHanboks(res.data);
        }).then(() => {
            console.log('axios done');
            console.log('hanboks', hanboks)
        })
        setCurrentItem({});
    }

    const posting = (postMethod) => {

        axios.post(searchPath, {    // http://localhost:3000/search -> /search
            id : currentItem.gs_Count,
            name : currentItem.gs_name,
            type : currentItem.gs_kind,
            maker : currentItem.gs_maker,
            position : currentItem.gs_position,
            barcode : currentItem.gs_barcode,
            method: postMethod,
            searchName : name,
            searchType: type,
        }).then((result) => {
            setHanboks(result.data);
            setSearchList(result.data);

            if (postMethod === 'DELETE') {
                setCurrentItem({});
            }
        })
    }


    const setItem = (keyword, item) => {
        // console.log(`item: ${item} , keyword : ${keyword}`);
        if (keyword === 'gs_maker') {
            setCurrentItem({...currentItem,
                gs_maker : item
            })
        }else if (keyword === 'gs_position') {
            setCurrentItem({...currentItem,
                gs_position : item
            })
        }else if (keyword === 'gs_name') {
            setCurrentItem({...currentItem,
                gs_name : item
            })
        }else if (keyword === 'gs_kind') {
            setCurrentItem({...currentItem,
                gs_kind : item
            })
        }else if (keyword === 'gs_barcode') {
            setCurrentItem({...currentItem,
                gs_barcode : item
            })
        }
    }

    // row onClick 
    const onView = (item) => {
        // console.log(item);
        setCurrentItem(item);   // Todo - item 바로 다 넣지 말고, 필요한것만
    }

    // 
    const onSort = (e) => {
        // console.log('sorting', keyword)
        console.log('sorting', e.target.id);
        let sorted = [...searchList]  

        if (e.target.id === 'maker') {
            sorted.sort((a, b) =>{
                if (a.gs_maker < b.gs_maker) {
                    return -1
                }else if (a.gs_maker > b.gs_maker) {
                    return 1
                }else{
                    return 0;
                }
            });
        }else if (e.target.id === 'name') {
            sorted.sort((a, b) => {
                return a.gs_name.localeCompare(b.gs_name); 
            });
        }else if (e.target.id === 'type') {
            sorted.sort((a, b) =>{
                if (a.gs_kind < b.gs_kind) {
                    return -1
                }else if (a.gs_kind > b.gs_kind) {
                    return 1
                }else{
                    return 0;
                }
            });
        }else if (e.target.id === 'position') {
            sorted.sort((a, b) => a.gs_position.localeCompare(b.gs_position));
        }
        setSearchList(sorted);
        console.log(searchList);
    }

    const enterSearch = (e) => {
        if (e.key === 'Enter') {
            search2()
        }
    }

    // 실시간 검색(filter) 
    useEffect(() => {
        search2();
    }, [name, type])

    return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-lg'>
            <div className='conatiner mt-3'>
                <form>
                <div className='row'>
                <div className='form-group col'>
                    <label htmlFor='GoodsName'>한복 이름</label>
                    <input type='text' className='form-control' id='GoodsName'
                    name='name' value={name} placeholder='e.g 은방울' onChange={({target : { value }}) => setName(value) } 
                    onKeyPress={(e) => {enterSearch(e)}}/>
                    <small id='GoodsNameHelp' className='form-text text-muted' >한복 이름을 검색합니다.</small>
                </div>
                <div className='form-group col'>    
                    <label htmlFor='GoodsType'>한복 종류</label>
                    <input type='text' className='form-control' id='GoodsType'
                    name='type' value={type} placeholder='e.g 치마' onChange={({target : { value }}) => setType(value)} />
                    <small id='GoodsTypeHelp' className='form-text text-muted' >한복 종류로 검색합니다.</small>
                </div>
                </div>
                </form>
                {/* <button className='btn btn-primary' onClick={() => search()}>검색</button> */}
                <button className='btn btn-primary ml-3' onClick={() => search2()}>검색</button>
            </div>
            
            <div className='container border mt-4 p-3'>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <small>매입처</small>
                        <input type='text' className='form-control' value={currentItem.gs_maker}
                        onChange={({target : {value}}) => setItem('gs_maker', value)}></input>
                    </div>
                    <div className='form-group col-md-6'>
                        <small>위치</small>
                        <input type='text' className='form-control' value={currentItem.gs_position}
                        onChange={({target : {value}}) => setItem('gs_position', value)}></input>
                    </div>
                    <div className='form-group col-md-6'>
                        <small>이름</small>
                        <input type='text' className='form-control' value={currentItem.gs_name}
                        onChange={({target : {value}}) => setItem('gs_name', value)}></input>
                    </div>
                    <div className='form-group col-md-6'>
                        <small>종류</small>
                        <input type='text' className='form-control' value={currentItem.gs_kind}
                        onChange={({target : {value}}) => setItem('gs_kind', value)}></input>
                    </div>
                    <div className='form-group col-md-6'>
                        <small>바코드</small>
                        <input type='text' className='form-control' value={currentItem.gs_barcode}
                        onChange={({target : {value}}) => setItem('gs_barcode', value)}></input>
                    </div>
                    <div className='d-flex justify-content-end bg-light'>
                        <button className='btn btn-primary m-2' onClick={() => posting('INSERT')}>신규추가</button>
                        <button className='btn btn-info m-2' onClick={() => posting('UPDATE')}>수정하기</button>
                        <button className='btn btn-info m-2' onClick={() => posting('DELETE')}>삭제하기</button>
                    </div>
                    
                </div>

            </div>
        </div>
        <div className='col-lg'>
            <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col' name='index' onClick={(e) => {onSort(e)}}>번호</th>
                    <th scope='col' name='gs_maker' id='maker' onClick={(e) => {onSort(e)}}>매입처</th>
                    <th scope='col' name='gs_position' id='position' onClick={(e) => {onSort(e)}}>위치</th>
                    <th scope='col' name='gs_name' id='name' onClick={(e) => {onSort(e)}}>이름</th>
                    <th scope='col' name='gs_kind' id='type' onClick={(e) => {onSort(e)}}>종류</th>
                </tr>
            </thead>
            <tbody>
                {searchList.map((item, index) =>
                    <HanbokItem index={index+1} item={item} onView={onView}/>
                )}
            </tbody>
            </table>
        </div>

        </div>
    

    
    </div>
    )
}

const KeywordInput = styled.input`
    width: 100%;
    transition: all .1s linear;
    background-color: #f3a303;
    border: 1px solid #af0f0f;

    &:focus {
        width: 200px;
        background-color: #f3a353;
        transform: translateX(-10px);
    }
`

export default Hanbok