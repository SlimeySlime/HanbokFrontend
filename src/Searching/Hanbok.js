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
    const [currentImage, setCurrentImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'
    const imagePath = process.env.NODE_ENV === 'production' ? '/hanbok' : 'http://localhost:3000/hanbok'

    useEffect(() => {
        // searchAll
        axios.get(searchPath)
        .then((result) =>{
            setHanboks(result.data);
            setSearchList(result.data);
        })
    },[])

    // imgpath = searchPath = process.env.NODE_ENV === 'production' ? '/img' : 'http://localhost:3000/img'

    // 검색 filter
    const search = () => {
        const nameReg = new RegExp(`${name}`, 'gi');
        let searched = hanboks.filter(item => nameReg.test(item.gs_name));
        const typeReg = new RegExp(`${type}`, 'gi');
        searched = searched.filter(item => typeReg.test(item.gs_kind));
        setSearchList(searched);
    }

    // 한복 신규 등록
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

    // 수정, 등록에서 키워드 변경
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
        setCurrentItem(item);   
    }
    // setItem -> getImage
    useEffect(() => {
        console.log('currentItem : ',currentItem)
        if (currentItem.gs_name !== undefined){
            // 담채/저고리/연두당의
            const xhr = new XMLHttpRequest()
            xhr.open('GET', imagePath + `/${currentItem.gs_maker}/${currentItem.gs_kind}/${currentItem.gs_name.toString().split(' ')[0]}`)
            xhr.responseType = 'blob'
            xhr.send()
            xhr.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200) {
                    // const url = window.URL || window.webkitURL;
                    const url = window.URL 
                    let imgsrc = url.createObjectURL(this.response)
                    setCurrentImage(imgsrc);
                }else{
                    setCurrentImage(null);
                }
            }
        }
    }, [currentItem])

    const changeImage = (e) => {
        // console.log(e.target.files[0])
        setImageData(e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            const base64 = reader.result
            if (base64) {
                setCurrentImage(base64.toString())
            }
        }
    }

    const uploadImage = (e) => {
        console.log(e)
        console.log(`upload to ${currentItem.gs_maker}/${currentItem.gs_kind}/${currentItem.gs_name}`)
        const formData = new FormData()
        formData.append('image', imageData)
        formData.append('hanbokDetail', currentImage.gs_maker)
        axios.post(imagePath, formData, {
            headers : {
                ContentType : 'multipart/form-data',
            },
            
            // params : {
            //     hanbokMaker : currentItem.gs_maker,
            //     hanbokType : currentImage.gs_kind,
            //     hanbokName : currentImage.gs_name
            // },
        })
        .then((result) => {
            console.log(result)
        })
    }

    // sort
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
            search()
        }
    }

    // 실시간 검색(filter) 
    useEffect(() => {
        search();
    }, [name, type])

    return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-lg-4'>
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
                <button className='btn btn-primary ml-3' onClick={() => search()}>검색</button>
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
            {/* Hanbok Preview */}
            <div className='container border mt-2 p-2'>
                {currentImage !== null ? 
                <div>
                    <img src={currentImage} width='100%' alt="hanbokImage" /> 
                </div>  
                : '' }
                <div> 
                    <input className='form-control' type="file" name="upload"
                        onChange={(e) => {changeImage(e)}}/>
                    <button className='btn btn-primary m-2' onClick={(e) => {uploadImage(e)}}>서버로 업로드</button>
                </div>
            </div>
            {/* Post with form */}
            <div className='container border mt-2 p-2'>
                <form action={imagePath} method='post' enctype='multipart/form-data'>
                    <label htmlFor="">multipart/form-data</label>
                    <input className='form-control' type="file" name="image"
                        onChange={(e) => {changeImage(e)}}/>
                    <button className='btn btn-primary' type="submit">업로드</button>
                </form>
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