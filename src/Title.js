import React from 'react'
import logo from './bdan.svg';
// import logo from '../public/'
import styled from 'styled-components';

const Title = () => {

    return(
        <div>
            <TitleLogo src={logo} width={'80px'} alt='비단본가'/>
            <nav className='navbar navbar-dark'>
                링크 1
            </nav>
        </div>
    )
}

const TitleLogo = styled.img`
    fill: red;
`

export default Title
