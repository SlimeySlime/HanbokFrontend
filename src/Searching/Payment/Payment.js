import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
// import AutoComplete from '@mui/material/Autocomplete';
// import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Payment = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [paymentList, setPaymentList] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState({payType: '',  payName: '', payInfo: ''});

    const [paymentType, setPaymentType] = useState([]);
    const [paymentName, setPaymentName] = useState([]);

    const paymentPath = process.env.NODE_ENV === 'production' ? '/search/payment' : 'http://localhost:3000/search/payment';
    const searchPath = process.env.NODE_ENV === 'production' ? '/search/paymentList' : 'http://localhost:3000/search/paymentList';

    useEffect(() => {
        const now = new Date();
        const firstDay = new Date(now.setDate(now.getDate() - now.getDate() + 1));
        setStartDate(firstDay);

        const end = new Date()
        const endDate = new Date(end.setDate(now.getDate() - now.getDate() + 1));
        endDate.setMonth(endDate.getMonth() + 1)
        endDate.setDate(endDate.getDate() - 1)
        setEndDate(endDate);
        // getPaymentList(startDateStr, endDateStr);   // 중복코드를 메소드로

        // 자동완성에 사용할 type, name 리스트
        axios.get(paymentPath)
        .then((result) => {
            setPaymentType(result.data[0].map(value => ({...value, label : value.sj_gubun, id : value.sj_count})));
            setPaymentName(result.data[1].map(value => ({...value, label : value.sj_name, id : value.sj_count})));
        })
    }, [])

    useEffect(() =>{
        getPaymentList()
    }, [startDate, endDate])

    // Date 값으로 파라미터
    const getPaymentList = (start, end) => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        
        // payType 등 파라미터 말고 filter하게 
        axios.get(searchPath, {
            params: {
                startDate: start != null ? start : startDateStr,
                endDate: end != null ? end : endDateStr,
                payType: searchKeywords.payType === null ? '' : searchKeywords.payType,
                payName: searchKeywords.payName === null ? '' : searchKeywords.payName,
                payInfo: searchKeywords.payInfo === null ? '' : searchKeywords.payInfo
            }
        }).then((result) => {
            // console.log(result);
            setPaymentList(result.data);
            // console.log('paymentList', paymentList);
        })
    }   
    // handmade autoComplete
    const onKeywordChange = (keyword) => {
        if (keyword.length > 0) {
            const regex = new RegExp(`${keyword}`, 'gi');
            const suggest = paymentType.filter( item => regex.test(item.sj_gubun));
        }else{
            
        }
    }

    function changeDate(keyword, value) {
        switch(keyword){
            case 'start':
                setStartDate(new Date(value))
                break
            case 'end':
                setEndDate(new Date(value))
                break
            default:
                break
        }

    }

    function changeMonth(keyword) {
        if (keyword === 'Next') {
            const start = startDate
            const first = new Date(start.setMonth(start.getMonth() + 1))
            setStartDate(first);
            
            const end = new Date(first)
            let last = new Date(end.setMonth(end.getMonth() + 1))
            last.setDate(end.getDate() - 1)
            setEndDate(last);

        }else if (keyword === 'Prev') {  
            const start = startDate
            const first = new Date(start.setMonth(start.getMonth() - 1))
            setStartDate(first);

            const end = new Date(first)
            let last = new Date(end.setMonth(end.getMonth() + 1))
            last.setDate(end.getDate() - 1)
            setEndDate(last);
        }
        
    }

    const setKeyword = (keyword, value) => {    // setKeyword 와 setKeywords
        console.log(keyword, value)

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
    }

    const sumFooter = () => {
        const income = paymentList.reduce((result, item) => 
            result = result + item.ex_inmoney, 0
        ) 
        const outcome = paymentList.reduce((result, item) => 
            result = result + item.ex_outmoney, 0
        )


        return(
        <Sum>
            <tr>
                <td>합계</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{outcome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
        </Sum>
        )
    }

    return(
        <div className="container-fluid mt-3">
            <div className="row align-items-end mb-3">
                <div className="col-sm-2"> 
                    <div className='col'>
                        <small className='form-text text-muted'>시작 날짜</small>   
                        <input className="form-control" type="date" 
                            value={startDate.toISOString().split('T')[0]}
                            onChange={(e) => {changeDate('start', e.target.value)}} />
                        <button className="btn btn-primary" onClick={() => {changeMonth('Prev')}}>◀ 이전달 </button>
                    </div>
                    <div className="col">
                        <small className='form-text text-muted'>마감 날짜</small>
                        <input className="form-control" type="date" 
                            value={endDate.toISOString().split('T')[0]}
                            onChange={(e) => {changeDate('end', e.target.value)}} />
                        <button className="btn btn-primary" onClick={() => {changeMonth('Next')}}>다음달 ▶</button>
                    </div>
                </div>

                <div className="col-sm-2">
                    <small className='form-text text-muted'>계정 과목</small>
                    <input className="form-control" placeholder="과목" list="payTypeList" id="payType" 
                        onChange={(e) => {setKeyword(e.target.id ,e.target.value)}}/>
                    <datalist id="payTypeList">
                        {paymentType.map((item, index) =>
                            <option value={item.sj_gubun} key={item.sj_count}></option>
                        )}
                    </datalist>
                </div>    
                <div className="col-sm-2">
                    <small className='form-text text-muted'>계정명</small>
                    {/* <input type="text" name="payName" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>    */}
                    <input className="form-control" placeholder="계정" list="payNameList" id="payName" 
                        onChange={(e) => {setKeyword(e.target.id ,e.target.value)}}/>
                    <datalist id="payNameList">
                        {paymentName.map((item, index) =>
                            <option value={item.sj_name}></option>
                        )}
                    </datalist>
                </div>    
                <div className="col-sm-2">
                    <small className='form-text text-muted'>내용</small>
                    <input className="form-control" id="payInfo"
                        onChange={(e) => {setKeyword(e.target.id, e.target.value)}}/>
                </div>    
                <div className="col-1">
                    <button className="btn btn-primary" onClick={ () => {getPaymentList()}} >검색</button>
                </div>
            </div>
            
            <div className="col">
                <table className="table table-bordered">
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
                    <tbody>
                        {paymentList.length === 0 && 
                            <tr>
                                <td>데이터가 없습니다..</td>
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
                    </tbody>
                    {sumFooter()}
                </table>
            </div>
            

        </div>
    )
}
// sticky tfoot
const Sum = styled.tfoot`
    bottom : -1px;
    background : coral;
    position : sticky;
`

export default Payment;
