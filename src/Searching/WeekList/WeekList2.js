import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components';
import {Swiper, SwiperSlide, navigation, freeMode} from 'swiper/react';
import SwiperCore, {FreeMode, Navigation, Pagination} from 'swiper'
import 'swiper/css';
// import WeekListModal from './WeekListModal'

SwiperCore.use([FreeMode, Navigation])

// saved branch
// todo - weeklist 다음주 연속대여 주황색, 2/1 빨간색 (이모도 가능하게끔)
const WeekList2 = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [nextWeekDate, setNextWeekDate] = useState();

    const [goodsData, setGoodsData] = useState([]);
    const [weekListItems, setWeekListItems] = useState([]);
    const [weekListItemsNext, setWeekListItemsNext] = useState([]);
    const [weekListMap, setWeekListMap] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemColors, setItemColor] = useState({
        warningColor : '#F96C6C'
    });

    const searchPath = process.env.NODE_ENV === 'production' ? '/search' : 'http://localhost:3000/search'

    useEffect(() => {
        // 수량 데이터용 goodsInfo 
        getGoodsData();

        // 1. 이번주 월요일 2. 이번주 일요일
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));  
        setStartDate(weekStart);
        const now2 = new Date();    // Todo - 다른 우아한 방법이 있을까?
        const weekEnd = new Date(now2.setDate(now2.getDate() - now2.getDay() + 7));
        setEndDate(weekEnd)

    }, [])

    async function getGoodsData(){
        const goods = {}
        try{
            const result = await axios.get(searchPath + '/hanbok')
            result.data.filter((item) => {
                return goods[item.gs_name] = item
            })
            setGoodsData(goods)
        }catch(e){
            console.error(e);
        }
    }

    // [startDate, endDate] 가 변경되면 searchWeek() 호출;
    useEffect(() => {
        searchWeek();
    }, [startDate, endDate, goodsData]);

    const searchWeek = (start = startDate, end = endDate) => {
        const nextWeekStart = new Date(endDate)
        nextWeekStart.setDate(nextWeekStart.getDate() + 1)
        const nextWeekStartStr = nextWeekStart.toISOString().split('T')[0].replace(/-/gi,'');

        const nextWeekEnd = new Date(endDate);
        nextWeekEnd.setDate((nextWeekEnd.getDate() + 7))
        const nextWeekEndStr = nextWeekEnd.toISOString().split('T')[0].replace(/-/gi,'');

        const startDateStr = startDate.toISOString().split('T')[0].replace(/-/gi,'');
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/gi,'');
        console.log(`searching ${startDateStr} ~ ${endDateStr} : ~ ${nextWeekEndStr}`);

        axios.get(searchPath + '/week', {
            params: {
                startDate : startDateStr,
                endDate: endDateStr,
                nextWeekStart: nextWeekStartStr,
                nextWeekEnd: nextWeekEndStr,
            }
        }).then((res) => {
            setHanbokMap(res.data[0], res.data[1])
        })
    }

    // HanbokMap에 대여수/재고 추가
    function setHanbokMap(thisWeek, nextWeek){
        const hanbokMap = new Map()    // new Map()
        // item 재고(stock), 대여수량(count)를 map에 추가
        thisWeek.filter((item) => {
            if (item.gs_name in hanbokMap) {
                hanbokMap[item.gs_name].count += 1;
            }else{
                hanbokMap[item.gs_name] = item
                if (item.gs_name in goodsData) {
                    hanbokMap[item.gs_name].stock = goodsData[item.gs_name].gs_jgquant
                }
                hanbokMap[item.gs_name].count = 1
            }
        })
        // 다음주 map
        const hanbokNextMap = new Map()    
        nextWeek.filter((item) => {
            hanbokNextMap[item.gs_name] = item
        })
        // hasNext와 warning 추가
        for(const weekItem in hanbokMap){
            if (hanbokMap[weekItem].stock <= hanbokMap[weekItem].count){
                hanbokMap[weekItem].warning = true
            }
            // 이중 for문으로 검색
            for(const weekItemNext in hanbokNextMap) {
                if (weekItem === weekItemNext) {
                    hanbokMap[weekItem].hasNext = true
                }
            }
        }
        // filter로 div만들기 좋게 배열로 변환해서 state에 저장
        const hanbokMapArray = []
        for(const weekItem in hanbokMap){
            hanbokMapArray.push(hanbokMap[weekItem])
        }

        setWeekListMap(hanbokMapArray)
        setWeekListItems(thisWeek);
        setWeekListItemsNext(nextWeek);
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
        const currentItems = []
        weekListItems.filter((item) => {
            if (item.gs_name === rentalInfo.gs_name){
                currentItems.push(item)
            }
        })
        weekListItemsNext.filter((item) => {
            if (item.gs_name === rentalInfo.gs_name){
                currentItems.push(item)
            }
        })
        console.log(currentItems)
        setSelectedItems(currentItems)
        // setCurrentData(rentalInfo)
        setModalVisible(true);
    }

    const modalClose = (e) => {
        // 회색부분 클릭시 닫기
        if (e.currentTarget === e.target) {
            setModalVisible(false);
        }
    }

    function ItemRow({item, index}){
        // const item = props.item
        // const index = props.index
        const base = itemColors.baseColor
        const warning = itemColors.warningColor
        const delivery = itemColors.deliveryColor

        return(
            <p onClick={() => modalOpen(item)}
                style={{
                    color : item.hasNext ? warning : base
                }}>
                {index + 1}. {item.rt_Delivery !== '' ? `택배)` : ''} {item.gs_name} ({item.count}/{item.stock})
            </p>
        )
    }
    function changeColor(color, id) {
        // base, warning, delivery colors
        setItemColor({
            ...itemColors,
            [id] : color

        })
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
                <div className='row'>
                    <label htmlFor="" className='form-label'>기본색</label>
                    <input type="color" name="" id="baseColor"   
                        onChange={(e) => {changeColor(e.target.value, e.target.id)}} />
                    <label htmlFor="" className='form-label'>강조색</label>
                    <input type="color" name="" id="warningColor"
                        value={itemColors.warningColor} 
                        onChange={(e) => {changeColor(e.target.value, e.target.id)}} />
                    <label htmlFor="" className='form-label'>택배색</label>
                    <input type="color" name="" id="deliveryColor" 
                        onChange={(e) => {changeColor(e.target.value, e.target.id)}} />
                </div>
            </div>
            {/* weeklist 팝업 */}
            {/* {modalOpen ? <WeekListModal /> : ''} */}
            <div>
                {modalVisible ? 
                <ModalWrapper visible={modalVisible} onClick={(e) => {modalClose(e)}} >
                <ModalInner tabIndex="0" className="modal-inner">
                    <div className='container-fluid'>
                        {/* 이번주 + 다음주리스트 합계.filter -> 각각 row로 map해서 보여줌 */}
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>대여일</th>
                                    <th>이름</th>
                                    <th>관계</th>
                                </tr>
                            </thead>
                            <tbody>
                            {selectedItems.map((item) => 
                                <tr>
                                    <td>{item.rt_rdate}</td>
                                    <td>{item.ct_name}</td>
                                    <td>{item.rt_ctBigo}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </ModalInner>
                </ModalWrapper> : ''}
            </div>
            <div className='container-fluid px-5'>
                <Swiper
                    navigation
                    spaceBetween={20}
                    slidesPerView={window.innerWidth >= 800 ? 6 : 2}
                    freeMode={
                        {enabled:true, sticky:false}
                    }
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {console.log(swiper)}}
                    >
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>A 구역</b></p>

                            {weekListMap.filter((item) => 
                                item.gs_position === 'A'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>B 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'B'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>C 구역</b></p>

                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'C'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>D 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'D'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>E 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'E'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CarouselItem>
                            <p className='text-center my-2'><b>F1 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'F1'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                            <p className='text-center my-2'><b>F2 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'F2'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                            <p className='text-center my-2'><b>F3 구역</b></p>
                            {weekListMap.filter((item, index) => 
                                item.gs_position === 'F3'
                            ).map((item, index) => 
                                <ItemRow item={item} index={index} />
                            )}
                        </CarouselItem>
                    </SwiperSlide>
                </Swiper>
            </div>
            
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
    padding: 14px;
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
