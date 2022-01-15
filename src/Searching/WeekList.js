import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';  // ㅡㅡ 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import style from './WeekList.module.css';
import Flickity from 'react-flickity-component';
import styled from 'styled-components';

const WeekList = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [weekListItems, setWeekListItems] = useState([]);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    useEffect(() => {
        const now = new Date();
        const now2 = new Date();    // Todo - 다른 우아한 방법이 있을까?
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        setStartDate(weekStart);
        // console.log('weekStart', weekStart)

        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd);
        // console.log('weekEnd', weekEnd);

        searchWeek(weekStart, weekEnd);
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

    const changeWeek = (keyword) => {
        // Prev , Next
        if (keyword === 'Prev') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
            setEndDate(new Date(endDate.setDate(endDate.getDate() - 7)));
        }else if (keyword === 'Next') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
            setEndDate(new Date(endDate.setDate(endDate.getDate() + 7)));
        }
    }

    // [startDate, endDate] 가 변경되면 searchWeek() 호출;
    useEffect(() => {
        searchWeek();
    }, [startDate, endDate]);

    return(
        <div className='p-3 mt-2 row'>
            <div className='col-2'>
                <div className='row'>
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
                    <button className='btn btn-primary m-2'  onClick={() => {changeWeek('Prev')}}>저번주 </button>
                    <button className='btn btn-primary m-2' onClick={() => {changeWeek('Next')}}>다음주 </button>
                    {/* <button className='btn btn-primary m-2' onClick={() => searchWeek()}>검색</button> */}

                </div>
            </div>
            
            <div className='col'> 
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
                        {/* e.g ) http://210.114.10.11/Hanbok/담채/저고리/연두당의.jpg */}
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
                            <WeekItem onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</WeekItem>
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
                        <li>F</li>
                        {weekListItems.filter((item) => 
                            item.gs_position === 'F'
                        ).map((item, index) => 
                            <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

const WeekItem = styled.p `
    /* background-color: #464646;
    color: #d8d8d8; */
    color : ${(props) => props.color || "black"} ;
`
export default WeekList;