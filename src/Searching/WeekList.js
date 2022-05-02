import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import style from './WeekList.module.css';
// import Flickity from 'react-flickity-component';
import styled from 'styled-components';
import {Swiper, SwiperSlide, navigation, freeMode} from 'swiper/react';
import SwiperCore, {FreeMode, Navigation} from 'swiper'

SwiperCore.use([FreeMode, Navigation])

const WeekList = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [weekListItems, setWeekListItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    useEffect(() => {
        const now = new Date();
        const now2 = new Date();    // Todo - 다른 우아한 방법이 있을까?
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        setStartDate(weekStart);
        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd);
    }, [])

    // [startDate, endDate] 가 변경되면 searchWeek() 호출;
    useEffect(() => {
        searchWeek();
    }, [startDate, endDate]);

    const searchWeek = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`searching ${startDateStr} ~ ${endDateStr}`);

        axios.get(searchPath + '/week', {
            params: {
                startDate : startDateStr,
                endDate: endDateStr
            }
        }).then((res) => {
            setWeekListItems(res.data);
        })
    }

    const updateIndex = (index) => {
        if (index < 0) {
            index = 0;
        }else if (index >= 3) {
            index = 2
        }
        console.log(`set Index to ${index}`);
        setActiveIndex(index);

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

    return(
        <div className='p-3 mt-1 row'>
            <div className='col-5-sm'>
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
                        <button className='btn btn-primary ml-5 my-3'  onClick={() => {changeWeek('Prev')}}>저번주 </button>
                        <button className='btn btn-primary mx-3 my-3' onClick={() => {changeWeek('Next')}}>다음주 </button>
                    </div>
        
                </div>
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
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'A'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                            </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>B 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'B'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>C 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'C'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>D 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'D'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>E 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'E'
                        ).map((item, index) => 
                        <p onClick={() => console.log(item.gs_name, ' clicked')}>
                            {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                        </p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>F1 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F1'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
                            </p>
                        )}
                        <p className='text-center my-2'><b>F2 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F2'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name} {item.rt_Gubun != '대여'? item.rt_Gubun : ''}
                            </p>
                        )}
                        <p className='text-center my-2'><b>F3 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F3'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {index + 1}. {item.rt_Delivery != '' ? `택)` : ''} {item.gs_name}
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

`

const Indicator = styled.div`
    display: flex;
    justify-content: center;
    
`

export default WeekList;
