import React, { useState } from 'react';
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

    const search = () => {
        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        // console.log(startDate.toISOString().split('T')[0].replace(/-/gi,''));
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        // console.log(endDate.toISOString().split('T')[0].replace(/-/gi,''));
        axios.get('http://localhost:3000/search/naver',{
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
                if (item.gs_position == 'A') {
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

    return(
        <div className='container-fluid p-3 row'>
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
                    <button className='btn btn-primary' onClick={search}>검색</button>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="true">
                            Dropdown
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><button className="dropdown-item" type="button">Action</button></li>
                            <li><button className="dropdown-item" type="button">Another action</button></li>
                            <li><button className="dropdown-item" type="button">Something else here</button></li>
                        </ul>
                    </div>
                </div>
                
            </div>

            <div className='col'> 
                <div className='row'>
                    <div className='col item-container' onclick={console.log('A clicked')}>
                        <li>A</li>
                        {weekListItemSorted[0].map((item, index) => 
                            <p onclick={console.log('A clicked')}>{item.gs_name}</p>
                        )}
                    </div>
                    <div className='col item-container' onClick={(e) => {columnSelect(e)}}>
                        <li>B</li>
                        <ol>    
                            {weekListItemSorted[1].map((item, index) => 
                                <li>{item.gs_name}</li>
                            )}
                        </ol>
                    </div>
                    <div className='col item-container' onClick={(e) => {columnSelect(e)}}>
                        <li>C</li>
                        <ol>
                            {weekListItemSorted[2].map((item, index) => 
                                <li>{item.gs_name}</li>
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
            
            <div className='col' hidden='true'>
                <table class='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope='row'>A</th>
                            <th scope='row'>B</th>
                            <th scope='row'>C</th>
                            <th scope='row'>D</th>
                            <th scope='row'>E</th>
                            <th scope='row'>F</th>
                            <th scope='row'>기타</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>

                        </tr>
                        {/* {[...Array(weekListItemSorted[7])].map((n, index) => 
                            <tr>
                                <td>{weekListItemSorted[0][index].gs_name}</td>
                                <td>{weekListItemSorted[1][index].gs_name}</td>
                                <td>{weekListItemSorted[2][index].gs_name}</td>
                                <td>{weekListItemSorted[3][index].gs_name}</td>
                                <td>{weekListItemSorted[4][index].gs_name}</td>
                                <td>{weekListItemSorted[5][index].gs_name}</td>
                                
                            </tr>
                        )} */}
                    </tbody>
                    <ul>
                        {weekListItems.map((item) => 
                            <li>{item.gs_name} / {item.gs_position} / {item.gs_barcode} </li>
                        )}
                    </ul>
                </table>
            </div>

            
        </div>
    )
}

export default WeekList;