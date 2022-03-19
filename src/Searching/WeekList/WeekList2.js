import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';
import {Swiper, SwiperSlide, navigation, freeMode} from 'swiper/react';
import SwiperCore, {FreeMode, Navigation} from 'swiper'
import 'swiper/css';
import WeekListModal from './WeekListModal'

SwiperCore.use([FreeMode, Navigation])

// saved branch
const WeekList2 = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [nextWeekDate, setNextWeekDate] = useState();

    const [goodsData, setGoodsData] = useState([]);
    const [weekListItems, setWeekListItems] = useState([]);
    const [weekListItemsNext, setWeekListItemsNext] = useState([]);
    const [weekListMap, setWeekListMap] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    useEffect(() => {
        const now = new Date();
        const now2 = new Date();    // Todo - 다른 우아한 방법이 있을까?
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        setStartDate(weekStart);
        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd);

        // 수량용 goodsInfo 
        axios.get(searchPath + '/hanbok')
        .then((res) => {

            // setGoodsData(res.data);
            const goods = {}
            res.data.filter((item) => {
                goods[item.gs_name] = item
            })
            console.log('goods Data',goods)
            setGoodsData(goods)
        })
    }, [])

    // [startDate, endDate] 가 변경되면 searchWeek() 호출;
    useEffect(() => {
        searchWeek();
    }, [startDate, endDate]);

    const searchWeek = () => {
        const nextWeek = new Date(endDate);
        nextWeek.setDate((nextWeek.getDate() + 7))
        const nextWeekStr = nextWeek.toISOString().split('T')[0].replace(/-/gi,'');

        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`searching ${startDateStr} ~ ${endDateStr} : ~ ${nextWeekStr}`);

        axios.get(searchPath + '/week', {
            params: {
                startDate : startDateStr,
                endDate: endDateStr,
                nextWeekDate: nextWeekStr,
            }
        }).then((res) => {
            // console.log(res)
            setWeekListItems(res.data[0]);
            setWeekListItemsNext(res.data[1]);
            // setWeekListMap(res.data[0])

            let weekItems = res.data[0];
            const hanbokMap = new Map()    // new Map()
            weekItems.filter((item) => {
                if (item.gs_name in hanbokMap) {
                    // console.log(`${item.gs_name} is aleardy`)
                    hanbokMap[item.gs_name].count += 1;
                }else{
                    hanbokMap[item.gs_name] = item
                    if (item.gs_name in goodsData) {
                        hanbokMap[item.gs_name].stock = goodsData[item.gs_name].gs_jgquant
                    }
                    hanbokMap[item.gs_name].count = 1
                }
            })
            // console.log('hanbok map : ', hanbokMap)
            // 꼭 이렇게 array -> map -> array 변환을 해야할까? 흐음
            const hanbokMapArray = []
            for(const weekItem in hanbokMap){
                hanbokMapArray.push(hanbokMap[weekItem])
            }
            console.log('hanbok map array', hanbokMapArray)
            setWeekListMap(hanbokMapArray)
        })
    }

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
        // setCurrentData(rentalInfo)
        setModalVisible(true);
    }

    const modalClose = (e) => {
        // 회색부분 클릭시 닫기
        if (e.currentTarget === e.target) {
            setModalVisible(false);
        }
    }
    return(
        <div className='p-3 mt-1 row'>
            <div className='col-5-sm ml-5'>
                <div className='row'>
                    <div className='form-group col'>
                        <input type="date" name="startDate" id="startDate" 
                        onChange={(e) => {datePick(e)}} value={startDate.toISOString().split('T')[0]} />
                        <small className='form-text text-muted'>시작 날짜</small>
                    </div>
                    <div className='form-group col'>
                        <input type="date" name="endDate" id="endDate"
                         onChange={(e) => {datePick(e)}} value={endDate.toISOString().split('T')[0]} />
                        <small className='form-text text-muted'>마감 날짜</small>
                    </div>
                    <div className='row'>
                        <button className='btn btn-primary ml-5 mb-5'  onClick={() => {changeWeek('Prev')}}>◀ 저번주 </button>
                        <button className='btn btn-primary mx-3 mb-5' onClick={() => {changeWeek('Next')}}>다음주 ▶ </button>
                    </div>
        
                </div>
            </div>
            {/* weeklist 팝업 */}
            {/* {modalOpen ? <WeekListModal /> : ''} */}
            <div>
                {modalVisible ? 
                <ModalWrapper visible={modalVisible} onClick={(e) => {modalClose(e)}} >
                <ModalInner tabIndex="0" className="modal-inner">
                    <div className='container-fluid'>
                        <div>
                            모달모달
                        </div> 
                    </div>
                </ModalInner>
                </ModalWrapper> : ''}
            </div>

            <Swiper
                navigation
                spaceBetween={20}
                slidesPerView={2}
                freeMode={
                    {enabled:true, sticky:false}
                }
                onSlideChange={() => console.log('page is')}
                onSwiper={(swiper) => {console.log(swiper)}}
                style={{maxWidth : '800px'}}
                >
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>A 구역</b></p>
                        {weekListMap.filter((item) => 
                            item.gs_position === 'A'
                        ).map((item, key) => 
                            <p onClick={() => setModalVisible(true)}>
                                {key + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                            </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>B 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'B'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>C 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'C'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>D 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'D'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>E 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'E'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>F1 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'F1'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                            </p>
                        )}
                        <p className='text-center my-2'><b>F2 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'F2'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                            </p>
                        )}
                        <p className='text-center my-2'><b>F3 구역</b></p>
                        {weekListMap.filter((item, index) => 
                            item.gs_position === 'F3'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery !== '' ? `택)` : ''} {item.gs_name} ({item.count}/{item.stock})
                            </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
            </Swiper>
            
        </div>
            
    )
}

const Carousel = styled.div`
    overflow: hidden;
`
// white-space : 공백문자 처리방법
const CarouselWrapper = styled.div`
    white-space: nowrap;
    transition: transform 0.3s;
    align-items: center;
`

const CarouselItem = styled.div`
    padding-left: 14px;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    border: 1px solid black;
    display: inline-block;
    align-items: center;
    justify-content: center;
    z-index: 1;

`
const Modal = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
`

// display: ${(props) => (props.visible ? 'block' : 'none')};
const ModalWrapper = styled.div`
    box-sizing: border-box;
    position: fixed;
    display: ${(props) => (props.visible ? 'block' : 'none')};
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

export default WeekList2;
