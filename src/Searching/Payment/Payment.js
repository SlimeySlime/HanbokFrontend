import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AutoComplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";



const Payment = () => {
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [paymentList, setPaymentList] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState({payType: '',  payName: '', payInfo: ''});

    const [paymentType, setPaymentType] = useState([]);
    const [paymentName, setPaymentName] = useState([]);

    const [suggestList, setSuggestList] = useState([]);

    const paymentPath = process.env.NODE_ENV === 'production' ? '/search/payment' : 'http://localhost:3000/search/payment';
    const searchPath = process.env.NODE_ENV === 'production' ? '/search/paymentList' : 'http://localhost:3000/search/paymentList';

    useEffect(() => {
        const startDateStr = new Date().toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = new Date().toISOString().split('T')[0].replace(/-/gi,'');
        axios.get(searchPath, {
            params: {
                startDate: startDateStr,
                endDate: endDateStr,
            }
        })
        .then((result) => {
            // console.log(result);
            setPaymentList(result.data);
            // console.log('paymentList', paymentList);
        })
        // 자동완성에 사용할 type, name 리스트
        axios.get(paymentPath)
        .then((result) => {
            console.log('type result, ', result.data[0]);
            // setPaymentType(result.data[0]);
            setPaymentType(result.data[0].map(value => ({...value, label : value.sj_gubun, id : value.sj_count})));
            // setPaymentName(result.data[1]);
            setPaymentName(result.data[1].map(value => ({...value, label : value.sj_name, id : value.sj_count})));
        })
    },[])

    const getPaymentList = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(` searching ${startDateStr} ~ ${endDateStr} -> ${searchKeywords.payType}, ${searchKeywords.payName} ,${searchKeywords.payInfo}`);
        axios.get(searchPath, {
            params: {
                startDate: startDateStr,
                endDate: endDateStr,
                payType: searchKeywords.payType === null ? '' : searchKeywords.payType,
                payName: searchKeywords.payName === null ? '' : searchKeywords.payName,
                payInfo: searchKeywords.payInfo === null ? '' : searchKeywords.payInfo
            }
        })
        .then((result) => {
            console.log(result);
            setPaymentList(result.data);
            console.log('paymentList', paymentList);
        })
    }   
    // handmade autoComplete
    const onKeywordChange = (keyword) => {
        if (keyword.length > 0) {
            const regex = new RegExp(`${keyword}`, 'gi');
            const suggest = paymentType.filter( item => regex.test(item.sj_gubun));

            console.log('type :', paymentType);
            console.log('suggest : ', suggest);
            setSuggestList(suggest);
        }else{
            setSuggestList([]);
        }

    }

    const setSearchKeyword = (keyword, value) => {    // setKeyword 와 setKeywords
        if (value !== null) {
            value = value.label;
        }

        switch(keyword){
            case 'payType':
                setSearchKeywords({...searchKeywords,
                    payType : value
                })
                break;
            case 'payName':
                setSearchKeywords({...searchKeywords,
                    payName : value
                })
                break;
            case 'payInfo':
                setSearchKeywords({...searchKeywords,
                    payInfo : value
                })
                break;
            default:
                break;
        }

        console.log('searchKeywords : ', searchKeywords);

    }

    return(
        <div className="container-fluid mt-3">
            <div className="row align-items-end mb-3">
                <div className="col-2"> 
                    <div className='col'>
                        <small className='form-text text-muted'>시작 날짜</small>   
                        <DatePicker
                            selected={startDate}
                            onChange={(e) => {setStartDate(e); getPaymentList();}}
                            selectsStart={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div className='col'>
                        <small className='form-text text-muted'>마감 날짜</small>
                        <DatePicker
                            selected={endDate}
                            onChange={(e) => {setEndDate(e); getPaymentList();}}
                            selectsEnd={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        />                        
                    </div>
                </div>
                
                <div className="col-2">
                    {/* <small className='form-text text-muted'>계정 과목</small>
                    <input type="text" name="payType" id="payType" onChange={(e) => {onKeywordChange(e.target.value)}}/> */}
                    <AutoComplete 
                        id='combo-box'
                        options={paymentType}
                        onChange={(e, value) => {setSearchKeyword("payType", value)}}
                        renderInput={(params) => <TextField {...params} label='계정과목' />}
                    />
                </div>    
                <div className="col-2">
                    {/* <small className='form-text text-muted'>계정명</small> */}
                    {/* <input type="text" name="payName" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>    */}
                    <AutoComplete 
                        disablePoral 
                        id='combo-box'
                        onChange={(e, value) => {setSearchKeyword("payName", value)}}
                        options={paymentName}
                        renderInput={(params) => <TextField {...params} label='계정명' />}
                    />
                </div>    
                <div className="col-2">
                    {/* <small className='form-text text-muted'>내용</small>
                    <input type="text" name="payInfo" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>                     */}
                    
                    <TextField label='내용' onChange={(e, value) => {setSearchKeyword("payInfo", value)}}/>
                </div>    
                <div className="col-1">
                    <button className="btn btn-primary" onClick={ () => {getPaymentList()}} >검색</button>
                    {/* <button className="btn btn-primary" onClick={ () => {testing()}} >테스팅</button> */}
                </div>
            </div>
            
            <div className="col">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="row">날짜</th>
                            <th scope="row">구분</th>
                            <th scope="row">종류</th>
                            <th scope="row">내용</th>
                            <th scope="row">입금액</th>
                            <th scope="row">출금액</th>
                        </tr>
                    </thead>
                        {paymentList.length == 0 && 
                            <tr>
                                <td>데이터가 없습니다.</td>
                            </tr>
                        }
                        {paymentList.map((item, index) =>
                            <tr>
                                <td>{item.ex_Date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
                                <td>{item.ex_sj_gubun}</td>
                                <td>{item.ex_sj_name}</td>
                                <td>{item.ex_data}</td>
                                <td>{item.ex_inmoney !== null ? item.ex_inmoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.ex_inmoney}</td>
                                <td>{item.ex_outmoney !== null ? item.ex_outmoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :  item.ex_outmoney}</td>
                            </tr>
                        )}
                    <tbody>

                    </tbody>
                </table>
            </div>
            

        </div>
    )
}


export default Payment;