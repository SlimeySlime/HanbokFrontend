import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
// import {FcPlus} from 'react-icons/fc'
import styled from 'styled-components';

const PaymentSetting = () => {

    const [paymentType, setPayemntType] = useState([]);
    const [paymentData, setPaymentData] = useState([]);
    const [selectedData, setSelected] = useState([]);
    const [currentType, setCurrentType] = useState('');
    const [currentData, setCurrentData] = useState('');

    const [selectedCell, setSelectedCell] = useState();

    const paymentPath = process.env.NODE_ENV === 'production'? '/search/payment' : 'http://localhost:3000/search/payment';

    // 처음 불러오기
    useEffect(() => {
        axios.get(paymentPath)
        .then((result) => {
            setPayemntType(result.data[0]);
            setPaymentData(result.data[1]);
        })
    }, [])

    // 계정과목 onClick 
    const selectType = (selectedItem) => {
        setCurrentType(selectedItem)
        let selected = paymentData.filter((item) => 
            item.sj_mainCount === selectedItem.sj_count
        )
        setSelected(selected)
        // selectedCell()   // TODO - cell onclick css
    }
    // 과목 onChange
    const setType = (name) => {
        setCurrentType({
            sj_count : currentType.sj_count,
            sj_gubun : name
        })
        setCurrentData('');
    }
    // 계정명 change
    const setTypeData = (name) => {
        // sj_count, sj_mainCount, sj_name
        setCurrentData({
            sj_count : currentData.sj_count,
            sj_name : name
        })
    }
    // 계정분류 post
    const typeUpdate = (keyword) => {
        if (keyword === 'Delete') {
            if (!window.confirm(`${currentType.sj_gubun}을(를) 삭제하시겠습니까?`)){        // delete confirm window 
                return  
            }
        }
        axios.post(paymentPath + '/type', {
            method: keyword,
            id: currentType.sj_count,
            name: currentType.sj_gubun
        })
        .then((result) => {
            console.log('res result.data', result.data)
            setPayemntType(result.data)
            if (keyword === 'Delete') setCurrentType('');
        })
    }
    // 계정명 post
    const typeDataUpdate = (keyword) => {
        if (keyword === 'Delete') {
            if (!window.confirm(`${currentData.sj_name}을(를) 삭제하시겠습니까?`)){        // delete confirm window 
                return  
            }
        }

        axios.post(paymentPath + '/name', {
            method: keyword,
            mainId: currentType.sj_count,
            id: currentData.sj_count,
            name: currentData.sj_name
        })
        .then((result) => {
            console.log('res result.data', result.data)
            setPaymentData(result.data)
            if (keyword === 'Delete') setCurrentType('');

            // let selected = paymentData.filter((item) => 
            //     item.sj_mainCount === currentType.sj_count
            // )
            // setSelected(selected)
        })
    }

    return(
        <div className='container row'>
            <div className="col border-right">
                <div className="row m-3">
                    <small id='GoodsNameHelp' className='form-text mr-3' >계정 과목</small>
                    <input className="form-control-inline" for="PaymentType" placeholder="계정과목"
                     value={currentType.sj_gubun} onChange={(e) => {setType(e.target.value)}}></input>
                    <button className="btn btn-primary ml-2" onClick={() => typeUpdate("Add")}>추가</button>
                    <button className="btn btn-info ml-2"  onClick={() => typeUpdate("Update")}>수정</button>
                    <button className="btn btn-info ml-2"  onClick={() => typeUpdate("Delete")}>삭제</button>
                </div>
                <table class='table table-sm table-striped '>
                    <thead>
                        <tr>
                            <th scope="row" className="pl-5"></th>
                            <th scope="row">계정 분류</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentType.map((item, index) => 
                        <tr key={item.sj_count} onClick={() => {selectType(item)}}>
                            <td className="col-1 pl-3">{index+1}.</td>
                            <td>{item.sj_gubun}</td>
                        </tr>)}
                        
                    </tbody>
                </table>    
            </div>
            <div className="col">
                <div className="row m-3">
                    <small id='GoodsNameHelp' className='form-text mr-3' >계정명</small>
                    <input className="form-control-inline" for="PaymentType" placeholder="계정과목"
                     value={currentData.sj_name} onChange={(e) => {setTypeData(e.target.value)}}></input>
                    <button className="btn btn-primary ml-2" onClick={() => typeDataUpdate("Add")}>추가</button>
                    <button className="btn btn-info ml-2"  onClick={() => typeDataUpdate("Update")}>수정</button>
                    <button className="btn btn-info ml-2"  onClick={() => typeDataUpdate("Delete")}>삭제</button>
                </div>
                <table class='table table-sm table-striped'>
                    <thead>
                        <tr>
                            <th scope="row" className="pl-5"></th>
                            <th scope="row">계정명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map((item, index) => 
                        item.sj_mainCount === currentType.sj_count ?
                        <tr onClick={() => setCurrentData(item)}>
                            <td className="col-1 pl-3">{index+1}.</td>
                            <td> {item.sj_name}</td>
                        </tr> : '')}
                        
                    </tbody>
                </table>    
            </div>
        </div>
    )
}


export default PaymentSetting;