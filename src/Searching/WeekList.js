import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';  // ㅡㅡ 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import css from './WeekList.css';

const WeekList = () => {
    
    const [week, setWeek] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [weekListItems, setWeekListItems] = useState([]);
    const [weekListItemSorted, setweekListItemSorted] = useState([[],[],[],[],[],[],[],[0]]);

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'


    useEffect(() => {

    }, [])

    const searchWeek = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        // console.log(startDate.toISOString().split('T')[0].replace(/-/gi,''));
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        // console.log(endDate.toISOString().split('T')[0].replace(/-/gi,''));
        axios.get(searchPath + '/naver', {
            params: {
                startDate : startDateStr,
                endDate: endDateStr
            }
        }).then((res) => {
            
            console.log(res);
            // res.data.sort( function (a, b){
            //     return a.gs_name - b.gs_name;
            // });
            setWeekListItems(res.data);
            let weekListSorted = [[],[],[],[],[],[],[]]         // A B C D E F Length 기타 배열 
            weekListItems.forEach(item => {
                if (item.gs_position === 'A') {
                    weekListSorted[0].push(item)
                }else if (item.gs_position === 'B') {
                    weekListSorted[1].push(item)
                }else if (item.gs_position === 'C') {
                    weekListSorted[2].push(item)
                }else if (item.gs_position === 'D') {
                    weekListSorted[3].push(item)
                }else if (item.gs_position === 'E') {
                    weekListSorted[4].push(item)
                }else if (item.gs_position === 'F') {
                    weekListSorted[5].push(item)
                }else{
                    weekListSorted[6].push(item)
                }
                
            });
            setweekListItemSorted(weekListSorted);
            console.log('sorted[a] : ',weekListSorted);
        })
    }

    const columnSelect = (e) => {
        console.log('column select ', e);
    }

    const changeWeek = (keyword) => {
        console.log(keyword)
    }

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
                    <button className='btn btn-primary m-2' onClick={() => searchWeek()}>검색</button>

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
                        <ol>    
                            {weekListItems.filter((item, index) => 
                                item.gs_position === 'B'
                            ).map((item, index) => 
                                <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                            )}
                        </ol>
                    </div>
                    <div className='col item-container' onClick={(e) => {columnSelect(e)}}>
                        <li>C</li>
                        <ol>
                            {weekListItems.filter((item, index) => 
                                item.gs_position === 'C'
                            ).map((item, index) => 
                                <p onClick={() => console.log(item.gs_name, ' clicked')}>{item.gs_name}</p>
                            )}
                        </ol>
                    </div>
                    <div className='col item-container'>
                        <li>D</li>
                        <ol>
                            {weekListItemSorted[3].map((item, index) => 
                                <li>{item.gs_name}</li>
                            )}
                        </ol>
                    </div>
                    <div className='col item-container'>
                        <li>E</li>
                        <ol>
                            {weekListItemSorted[4].map((item, index) => 
                                <li>{item.gs_name}</li>
                            )}
                        </ol>
                    </div>
                    <div className='col item-container'>
                        <li>F</li>
                        <ol>
                            {weekListItemSorted[5].map((item, index) => 
                                <li>{item.gs_name}</li>
                            )}
                        </ol>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default WeekList;