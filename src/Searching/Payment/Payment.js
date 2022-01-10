import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Payment = () => {
    const now = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [paymentList, setPaymentList] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState({payType: '',  payName: '', payInfo: ''});

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
    },[])

    const getPaymentList = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`${startDateStr} ~ ${endDateStr}`);
        axios.get(searchPath, {
            params: {
                startDate: startDateStr,
                endDate: endDateStr,
                payType: searchKeywords.payType,
                payName: searchKeywords.payName,
                payInfo: searchKeywords.payInfo
            }
        })
        .then((result) => {
            console.log(result);
            setPaymentList(result.data);
            console.log('paymentList', paymentList);
        })
    }

    const setSearchKeyword = (keyword, value) => {    // setKeyword 와 setKeywords

        switch(keyword){
            case 'payType':
                setSearchKeywords({...searchKeywords,
                    payType : value.trim()
                })
                break;
            case 'payName':
                setSearchKeywords({...searchKeywords,
                    payName : value.trim()
                })
                break;
            case 'payInfo':
                setSearchKeywords({...searchKeywords,
                    payInfo : value.trim()
                })
                break;
            default:
                break;
        }

        // console.log('searchKeywords : ', searchKeywords);

    }

    return(
        <div className="container-fluid mt-3">
            <div className="row align-items-start">
                <div className="col-sm-2"> 
                    <div className='col'>
                        <DatePicker
                            selected={startDate}
                            onChange={(e) => {setStartDate(e); getPaymentList();}}
                            selectsStart={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <small className='form-text text-muted'>시작 날짜</small>
                    </div>
                    <div className='col'>
                        <DatePicker
                            selected={endDate}
                            onChange={(e) => {setEndDate(e); getPaymentList();}}
                            selectsEnd={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <small className='form-text text-muted'>마감 날짜</small>
                    </div>
                </div>
                
                <div className="col-2">
                    <input type="text" name="payType" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>
                    <small className='form-text text-muted'>계정 과목</small>
                </div>    
                <div className="col-2">
                    <input type="text" name="payName" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>
                    <small className='form-text text-muted'>계정명</small>
                </div>    
                <div className="col-2">
                    <input type="text" name="payInfo" id="payType" onChange={(e) => {setSearchKeyword(e.target.name, e.target.value)}}/>
                    <small className='form-text text-muted'>내용</small>
                </div>    
                <div className="col-1">
                    <button className="btn btn-primary" onClick={ () => {getPaymentList()}} >검색</button>
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