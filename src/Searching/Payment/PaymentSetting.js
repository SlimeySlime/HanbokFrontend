import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
// import {FcPlus} from 'react-icons/fc'
import styled from 'styled-components';

const PaymentSetting = () => {

    const [paymentType, setPayemntType] = useState([]);
    const [paymentData, setpaymentData] = useState([]);
    const [selectedData, setSelected] = useState([]);
    const [currentType, setCurrentType] = useState('');
    const [selectedCell, setSelectedCell] = useState();

    let paymentKey = -1;

    const paymentPath = process.env.NODE_ENV === 'production'? '/search/payment' : 'http://localhost:3000/search/payment';

    useEffect(() => {
        axios.get(paymentPath)
        .then((result) => {
            // console.log(result.data)    
            setPayemntType(result.data[0]);
            // console.log(paymentType);
            setpaymentData(result.data[1]);
            // console.log(paymentData);
        })
    }, [])

    const selectType = (selectedItem) => {
        console.log(selectedItem)
        setCurrentType(selectedItem)
        let selected = paymentData.filter((item) => 
            item.sj_mainCount === selectedItem.sj_count
        )
        setSelected(selected)

        // selectedCell()   // TODO - cell onclick css
    }
    // value change를 위해서 onChange가 동반
    const setType = (name) => {
        setCurrentType({
            sj_count : currentType.sj_count,
            sj_gubun : name
        })
    }

    const typeUpdate = (keyword) => {
        if (keyword === 'Delete') {
            if (!window.confirm(`${currentType.sj_gubun}을(를) 삭제하시겠습니까?`)){        // delete confirm window 
                return  
            }
        }

        console.log('type ', keyword)
        axios.post(paymentPath, {
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
    const changeType = (e) => {
        console.log(e);
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
                        <tr key={item.sj_count} onClick={() => selectType(item)}>
                            <td className="col-1 pl-3">{index+1}.</td>
                            <td>{item.sj_gubun}</td>
                        </tr>)}
                        
                    </tbody>
                </table>    
            </div>
            <div className="col">
                <form className="form-inline m-3">
                    <small id='GoodsNameHelp' className='form-text mr-3' >계정명</small>
                    <input className="form-control" for="PaymentType"></input>
                    <button className="btn btn-primary ml-2">추가</button>
                    <button className="btn btn-info ml-2">수정</button>
                    <button className="btn btn-info ml-2">삭제</button>
                </form>
                <table class='table table-sm table-striped'>
                    <thead>
                        <tr>
                            <th scope="row" className="pl-5"></th>
                            <th scope="row">계정명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((item, index) => 
                        <tr>
                            <td className="col-1 pl-3">{index+1}.</td>
                            <td> {item.sj_name}</td>
                        </tr>)}
                        
                    </tbody>
                </table>    
            </div>
        </div>
    )
}


export default PaymentSetting;