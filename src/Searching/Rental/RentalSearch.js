import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RentalItem from './Rentalitem';
import RentalModal from './InfoModal';
import styled from 'styled-components';

const RentalSearch = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rentalData, setRentalData] = useState([]);
    const [currentData, setCurrentData] = useState({});

    const [modalVisible, setModalVisible] = useState(false);

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
    // 모달 오픈 + currentData
    const modalOpen = (rentalInfo) => {
        console.log('clicked ', rentalInfo);
        setCurrentData(rentalInfo)
        setModalVisible(true);
    }

    const modalClose = (e) => {
        // 회색부분 클릭시 닫기
        if (e.currentTarget === e.target) {
            setModalVisible(false);
        }
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
            {/* <RentalModal modalVisible={modalVisible}>
            </RentalModal> */}
            <div>
                <ModalOverlay visible={modalVisible}/>
                <ModalWrapper visible={modalVisible} onClick={(e) => {modalClose(e)}} >
                <ModalInner tabIndex="0" className="modal-inner">
                    <div className='container-fluid'>
                        <div className='col'>
                            <div className='row'>
                                <p>계약일 : {currentData.rt_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')}</p>
                                <p className='p ml-3'>행사일 : {currentData.rt_rdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')}</p>
                            </div>
                            <div className='row'>
                                <p>고객명 : {currentData.ct_name}</p>
                                <p className='p ml-3'>관계 : {currentData.rt_ctBigo}</p>
                            </div>
                            <div className='row'>
                                <p>연락처 : {currentData.ct_tel1}</p>
                            </div>
                            <div className='row border-top pt-3'>
                                <p>{currentData.rt_gsname1}</p>
                            </div>
                            <div className='row'>
                                <p>{currentData.rt_gsname2}</p>
                            </div>
                            <div className='row'>
                                <p>{currentData.rt_gsname3}</p>
                            </div>
                            <div className='row border-bottom mb-3'>
                                <p>{currentData.rt_gsname4}</p>
                            </div>
                            <div className='row'>
                                <p>{currentData.rt_bigo1}</p>
                                <p>{currentData.rt_bigo2}</p>
                                <p>{currentData.rt_bigo3}</p>
                            </div>
                        </div>
                    </div>
                </ModalInner>
                </ModalWrapper>
            </div>
            {/* 모바일 작은 테이블 */}
            <SimpleTable className='table table-hover'>
                <thead>
                    <tr>
                        <th>구분 </th>
                        <th>출고일</th>
                        <th>고객명</th>
                        <th>관계</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalData.map((item) => 
                        <tr onClick={() => {modalOpen(item)}}>
                            <td>{item.rt_Gubun}</td>
                            <td>{item.rt_rdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
                            <td>{item.ct_name}</td>
                            <td>{item.rt_ctBigo}</td>
                        </tr>
                    )}
                </tbody>
            </SimpleTable>
            {/* 큰 테이블 */}
            <DetailTable className='table table-hover'>
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
                        <RentalItem modalOpen={modalOpen} info={item}></RentalItem>
                    )}
                </tbody>
            </DetailTable>
        </div>
    </div>
    )
}

const SimpleTable = styled.table`
    @media screen and (min-width: 1200px){
        display: none;
    }
`
const DetailTable = styled.table`
    @media screen and (max-width: 1200px){
        display: none;
    }
`

const Modal = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
`

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    overflow: auto;
    outline: 0;
`

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
`

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 360px;
    max-width: 480px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
    z-index: 50;
  
`

export default RentalSearch;
