import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RentalItem from './Rentalitem';

const RentalSearch = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rentalData, setRentalData] = useState([]);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    // 이번주 불러오기
    useEffect(() => {
        const now = new Date();
        const now2 = new Date();    // Todo - 다른 우아한 방법이 있을까?
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        setStartDate(weekStart);
        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd);
    }, [])

    useEffect(() => {
        searchRental();
    }, [startDate, endDate]);

    const searchRental = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`searching ${startDateStr} ~ ${endDateStr}`);

        axios.get(searchPath + '/rental', {
            params :{
                startDate: startDateStr,
                endDate: endDateStr,
            }
        })
        .then((result) => {
            console.log(result);
            setRentalData(result.data);
        })
    }
    // 날짜 선택 및 이번, 다음 주
    const datePick = (e) => {
        let pick = e.target.value
        if (e.target.id === 'startDate') {
            setStartDate(new Date(pick))
        }else if (e.target.id === 'endDate') {
            setEndDate(new Date(pick))
        }
    }
    const changeWeek = (keyword) => {
        // Prev , Next
        if (keyword === 'Prev') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
            setEndDate(new Date(endDate.setDate(endDate.getDate() - 7)));
        }else if (keyword === 'Next') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
            setEndDate(new Date(endDate.setDate(endDate.getDate() + 7)));
        }
        // ToDo - 현재에서 -+7이 아니라, 무조건 7일되도록
    }

    const modalOpen = (rentalInfo) => {
        console.log('modal');
        console.log(rentalInfo)
    }

    return (
    <div>
        <div className='col mt-4'>
            <div className='row'>
                <div className='form-group col-2-sm ml-3'>
                    <input type="date" name="startDate" id="startDate" 
                    onChange={(e) => {datePick(e)}} value={startDate.toISOString().split('T')[0]} />
                    <small className='form-text text-muted'>시작 날짜</small>
                    <button className='btn btn-primary'  onClick={() => {changeWeek('Prev')}}>저번주 </button>
                </div>
                <div className='form-group col-2-sm ml-3'>
                    <input type="date" name="endDate" id="endDate"
                    onChange={(e) => {datePick(e)}} value={endDate.toISOString().split('T')[0]} />
                    <small className='form-text text-muted'>마감 날짜</small>
                    <button className='btn btn-primary' onClick={() => {changeWeek('Next')}}>다음주 </button>
                </div>
                <div className='form-group col-2-sm ml-3'>
                    <small className='form-label' htmlFor="searchKeyword">검색 키워드</small>
                    <input className='form-control ' type="text" name="searchKeyword" />
                </div>
                {/* 조악한 버튼위치 */}
                <button className='btn btn-primary m-3 mb-5' onClick={() => {}}>검색</button>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>구분 </th>
                        <th>계약일</th>
                        <th>출고일</th>
                        <th>고객명</th>
                        <th>관계</th>
                        <th>상품명</th>    
                        <th>금액</th>
                        <th>선금</th>
                        <th>잔금</th>
                        <th>참고사항</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalData.map((item) => 
                        <RentalItem modal={modalOpen} onClick={() => {console.log('click')}} item={item}></RentalItem>
                    )}
                </tbody>
                {/* 합계 등 표시용 */}
                <tfoot>
                    <tr>
                        <th>구분 </th>
                        <th>계약일</th>
                        <th>출고일</th>
                        <th>고객명</th>
                        <th>관계</th>
                        <th>상품명</th>    
                        <th>금액</th>
                        <th>선금</th>
                        <th>잔금</th>
                        <th>참고사항</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    )
}

export default RentalSearch;
