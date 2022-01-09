import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const Payment = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentList, setPaymentList] = useState([]);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search/paymentList' : 'http://localhost:3000/search/paymentList';

    useEffect(() => {
        axios.get(searchPath)
        .then((result) => {
            console.log(result);
            setPaymentList(result.data);
            console.log('paymentList', paymentList);
        })
    },[])

    return(
        <div className="container-fluid mt-3">
            <div className="col">
                <div className='form-group col'>
                    <DatePicker
                        selected={startDate}
                        onChange={(e) => {setStartDate(e)}}
                        selectsStart={endDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <small className='form-text text-muted'>시작 날짜</small>
                </div>
                <div className='form-group col'>
                    <DatePicker
                        selected={endDate}
                        onChange={(e) => {setEndDate(e)}}
                        selectsEnd={endDate}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <small className='form-text text-muted'>마감 날짜</small>
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
                        {paymentList.map((item, index) =>
                            <tr>
                                <td>{item.ex_Date}</td>
                                <td>{item.ex_sj_gubun}</td>
                                <td>{item.ex_sj_name}</td>
                                <td>{item.ex_data}</td>
                                <td>{item.ex_inmoney}</td>
                                <td>{item.ex_outmoney}</td>
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