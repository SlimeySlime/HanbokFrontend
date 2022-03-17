import React from 'react';

const Rentalitem = ({info, modalOpen}) => {
    // 흠
    // const item = info
    const items = [info.rt_gsname1.split(' ')[1], info.rt_gsname2.split(' ')[1], info.rt_gsname3.split(' ')[1], info.rt_gsname4.split(' ')[1]]
    const rentalString = items.join(' / ').replace(/\/(\s*\/|$)/, '') // join후에 뒤에 / 제거
    // 하지만 조금 부족함
    // const rentalString = items.join(' / ') 

    return(
        // item -> info (이름만)
        <tr onClick={() => modalOpen(info)}>
            <td>{info.rt_Gubun}</td>
            <td>{info.rt_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
            <td>{info.rt_rdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
            <td>{info.ct_name}</td>
            <td>{info.rt_ctBigo}</td>
            {/* <td>{(info.rt_gsname1).split(' ')[1]} / {info.rt_gsname2.split(' ')} / {info.rt_gsname3} / {info.rt_gsname4} </td> */}
            <td>{rentalString}</td>
            <td>{info.rt_amount}</td>
            <td>{info.rt_payAmount}</td>
            {/* rt_payAmount1~3 => 현금, 계좌, 카드 */}
            <td>{info.rt_remain}</td>
            <td style={{width : '300px', height : '30px'}}>{info.rt_bigo1} / {info.rt_bigo2} / {info.rt_bigo3}</td>
        </tr>
        
    )
}

export default Rentalitem;