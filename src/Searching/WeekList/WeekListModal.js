import React from 'react'
import styled from 'styled-components'

const WeekListModal = () => {


    return(
        <Modal>
            <ModalOverlay/>
            <ModalWrapper>
            <ModalInner>
                <div>모달</div>
                <div>모달</div>
                <div>모달</div>
                <div>모달</div>
                <div>모달</div>
            </ModalInner>
            </ModalWrapper>
        </Modal>
    )
}


const Modal = styled.div`
    display : 'block'
`

// display: ${(props) => (props.visible ? 'block' : 'none')};
const ModalWrapper = styled.div`
    box-sizing: border-box;
    position: fixed;
    display : 'block'
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
    display : 'block'
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

export default WeekListModal;