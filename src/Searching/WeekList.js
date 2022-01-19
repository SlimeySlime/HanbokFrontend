import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import style from './WeekList.module.css';
// import Flickity from 'react-flickity-component';
import styled from 'styled-components';
import {Swiper, SwiperSlide, navigation, pagination, freeMode} from 'swiper/react';
import 'swiper/css';
// import 'swiper/swiper-bundle.css';

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
        console.log(weekStart.toISOString().split('T'));
        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd);
        // console.log(weekEnd.toISOString().split('T'));
 
        // searchWeek(weekStart, weekEnd); -> useEffect(() => , [setStartDate, setEndDate])
    }, [])

    const searchWeek = () => {

        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`searching ${startDateStr} ~ ${endDateStr}`);

        axios.get(searchPath + '/naver', {
            params: {
                startDate : startDateStr,
                endDate: endDateStr
            }
        }).then((res) => {
            setWeekListItems(res.data);
        })
    }

    const columnSelect = (e) => {
        console.log('column select ', e);
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
        // console.log(pick);
        // console.log(new Date(pick))
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

    // [startDate, endDate] 가 변경되면 searchWeek() 호출;
    useEffect(() => {
        searchWeek();
    }, [startDate, endDate]);

    return(
        <div className='p-3 mt-2 row'>
            <div className='col-5-sm'>
                <div className='row'>
                    <div className='form-group col'>
                        <input type="date" name="startDate" id="startDate" 
                        onChange={(e) => {datePick(e)}} value={startDate.toISOString().split('T')[0]} />
                        {/* <DatePicker
                            selected={startDate}
                            onChange={(e) => {setStartDate(e)}}
                            selectsStart={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        /> */}
                        <small className='form-text text-muted'>시작 날짜</small>
                    </div>
                    <div className='form-group col'>
                        <input type="date" name="endDate" id="endDate"
                         onChange={(e) => {datePick(e)}} value={endDate.toISOString().split('T')[0]} />
                        {/* <DatePicker
                            selected={endDate}
                            onChange={(e) => {setEndDate(e)}}
                            selectsEnd={endDate}
                            startDate={startDate}
                            endDate={endDate}
                        /> */}
                        <small className='form-text text-muted'>마감 날짜</small>
                    </div>
                    <div className='row'>
                        <button className='btn btn-primary ml-5 my-3'  onClick={() => {changeWeek('Prev')}}>저번주 </button>
                        <button className='btn btn-primary mx-3 my-3' onClick={() => {changeWeek('Next')}}>다음주 </button>
                    </div>
                    
                    {/* <button className='btn btn-primary m-2' onClick={() => searchWeek()}>검색</button> */}

                </div>
            </div>
            
            <div className='col' hidden='true'> 
                <div className='row'>
                    <div className='col item-container' onclick={console.log('A clicked')}>
                        <li>A</li>
                        {/* {weekListItemSorted[0].map((item, index) => 
                            <p onclick={console.log('A clicked')}>{item.gs_name}</p>
                            
                        )} */}
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'A'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                    <div className='col item-container' onClick={(e) => {columnSelect(e)}}>
                        <li>B</li> 
                        {weekListItems.filter((item) => 
                            item.gs_position === 'B'
                        ).map((item, index) => 
                            
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>
                                {item.gs_name}
                                {/* <img src='http://210.114.10.11/Hanbok/담채/저고리/연두당의.jpg'></img> */}
                            </p>
                        )}
                    </div>
                    <div className='col item-container' onClick={(e) => {columnSelect(e)}}>
                        <li>C</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'C'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                    <div className='col item-container'>
                        <li>D</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'D'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                    <div className='col item-container'>
                        <li>E</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'E'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                    <div className='col item-container'>
                        <li>F1</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'F1'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                        <li>F2</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'F2'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                        <li>F3</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'F3'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                </div>
            </div>

            <Carousel hidden='true'>
                <Indicator>
                    <button onClick={() => {updateIndex(activeIndex - 1)}}>prev</button>
                    <button onClick={() => {updateIndex(activeIndex + 1)}}>next</button>
                </Indicator>
                <CarouselWrapper style={{transform : `translateX(${activeIndex * -100}%)`}}>
                    <CarouselItem>
                        <div className='container'>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1232323232</li>
                        </div>
                        
                    </CarouselItem>
                    <CarouselItem>
                        <div className='container'>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1232323232</li>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className='container'>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1</li>
                            <li>item1232323232</li>
                        </div>
                    </CarouselItem>
                </CarouselWrapper>
                
            </Carousel>
            <div className='container'>

            </div>
            <Swiper
                navigation
                pagination
                spaceBetween={10}
                slidesPerView={2}
                freeMode={
                    {enabled:true, sticky:false}
                }
                onSlideChange={() => console.log('page is')}
                onSwiper={(swiper) => {console.log(swiper)}}
                >
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>A 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'A'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>B 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'B'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>C 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'C'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>D 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'D'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>E 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'E'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                    </CarouselItem>
                </SwiperSlide>
                <SwiperSlide>
                    <CarouselItem>
                        <p className='text-center my-2'><b>F1 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F1'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                        <p className='text-center my-2'><b>F2 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F2'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
                        )}
                        <p className='text-center my-2'><b>F3 구역</b></p>
                        {weekListItems.filter((item, index) => 
                            item.gs_position === 'F3'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{index + 1}. {item.gs_name}</p>
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
