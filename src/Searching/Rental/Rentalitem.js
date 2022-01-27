import React from 'react';

const Rentalitem = (info, modal) => {
    // 흠
    const {item} = info

    return(
        <tr onClick={() => modal}>
            <td>{item.rt_Gubun}</td>
            <td>{item.rt_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
            <td>{item.rt_rdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
            <td>{item.ct_name}</td>
            <td>{item.rt_ctBigo}</td>
            <td>{(item.rt_gsname1).split(' ')[1]} / {item.rt_gsname2.split(' ')} / {item.rt_gsname3} / {item.rt_gsname4} </td>
            <td>{item.rt_amount}</td>
            <td>{item.rt_payAmount}</td>
            {/* rt_payAmount1~3 => 현금, 계좌, 카드 */}
            <td>{item.rt_remain}</td>
            <td style={{width : '300px', height : '30px'}}>{item.rt_bigo1} / {item.rt_bigo2} / {item.rt_bigo3}</td>
        </tr>
    )
}

export default Rentalitem;