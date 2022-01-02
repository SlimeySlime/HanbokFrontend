import React, {useState, useEffect} from 'react'
import axios from 'axios';
import HanbokItem from './HanbokItem';

const Hanbok = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    // const [keyword, setKeyword] = useState( ['' , ''] ) 
    const [hanboks, setHanboks] = useState([]);
    const [currentItem, setCurrentItem] = useState({});

    const search = () => {
        name.replace(' ', '')
        type.replace(' ', '')
        axios.get(`http://localhost:3000/search`, {     // http://localhost:3000/search -> /search
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
        // to axios.post('/Hanboks')
        axios.post('http://localhost:3000/search', {    // http://localhost:3000/search -> /search
            id : currentItem.gs_Count,
            name : currentItem.gs_name,
            type : currentItem.gs_kind,
            maker : currentItem.gs_maker,
            position : currentItem.gs_position,
            barcode : currentItem.gs_barcode,
            method: postMethod,
            searchName : name,
            searchType: type,
        }).then((res) => {
            setHanboks(res.data);
            console.log('post res', res);
            if (postMethod === 'DELETE') {
                setCurrentItem({});
            }
        })
    }

    useEffect(() => {

    })

    const setItem = (keyword, item) => {
        console.log(`item: ${item} , keyword : ${keyword}`);

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
        // console.log(currentItem);
    }

    const onView = (item) => {
        console.log(item);
        setCurrentItem(item);   // Todo - item 바로 다 넣지 말고, 필요한것만
    }

    const onSort = (keyword) => {
        console.log(keyword)

        setHanboks(hanboks.sort((a, b) =>{
            return a.gs_name - b.gs_name;
        }));
    }

    return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-4'>
            <div className='conatiner mt-3'>
                <form>
                <div className='row'>
                <div className='form-group col'>
                    <label htmlFor='GoodsName'>한복 이름</label>
                    <input type='text' className='form-control' id='GoodsName'
                    name='name' value={name} placeholder='e.g 은방울' onChange={({target : { value }}) => setName(value) } />
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
                <button className='btn btn-primary' onClick={() => search()}>검색</button>
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
        <div className='col-8'>
            <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col' name='g' onClick={(e) => {onSort(e)}}>번호</th>
                    <th scope='col' name='gs_maker' onClick={(e) => {onSort('gs_maker')}}>매입처</th>
                    <th scope='col' name='gs_name' onClick={(e) => {onSort(e)}}>위치</th>
                    <th scope='col' name='gs_name' onClick={(e) => {onSort(e)}}>이름</th>
                    <th scope='col' name='gs_kind' onClick={(e) => {onSort(e)}}>종류</th>
                </tr>
            </thead>
            <tbody>
                {/* {hanbokList} */}
                {hanboks.map((item, index) =>
                    <HanbokItem key={item.gs_Count} index={index+1} item={item} onView={onView}/>
                )}
            </tbody>
            </table>
        </div>

        </div>
    

    
    </div>
    )

    
}

export default Hanbok