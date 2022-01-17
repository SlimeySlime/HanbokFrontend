import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import styled from './WeekList.module.css';
import styled from 'styled-components';

const WeekList = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const searchPath = process.env.NODE_ENV == 'production' ? '/search' : 'http://localhost:3000/search'

    const modalOpen = () => {
        console.log('modal open');
    }

    return(
        <div className='container'>

                <div class="modal fade" tabindex="-1" id="mainModal" aria-hidden='true' aria-labelledby="exampleModalLabel">
                
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">e.g 한복입력</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="name">이름</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
                </div>
            </div>
            <button class="btn btn-secondary" data-bs-toggle='modal' data-bs-target='#mainModal'>모달</button>
            {/* <ModalWrapper  tabIndex="-1" visible='true'>
                <ModalInner tabIndex="0" className="modal-inner">
                    am modal
                </ModalInner>
            </ModalWrapper> */}
        </div>
        

    )
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  // display: ${(props) => (props.visible ? 'block' : 'none')};
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
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
  z-index: 999;
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
`
export default WeekList;