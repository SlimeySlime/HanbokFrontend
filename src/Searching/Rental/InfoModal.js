import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const InfoModal = ({info, modalVisible}) => {

    // const [modalVisible, setModalVisible] = useState(true);
    const item = info

    const modalClose = (e) => {
        if (e.currentTarget === e.target) {
            // setModalVisible(false);
        }
    }

    return (
    <div>
        <Modal>
            <ModalWrapper visible={modalVisible}
            onClick={(e) => {modalClose(e); console.log('click Wrapper')}} >
            <ModalInner tabIndex="0" className="modal-inner">
                <p>am modal 1</p>
                <p>am modal 2</p>
                <p>am modal 3</p>
                <p>am modal 4</p>
                <p>am modal</p>
            </ModalInner>
            </ModalWrapper>
        </Modal>
    </div>
    )
}

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
export default InfoModal;