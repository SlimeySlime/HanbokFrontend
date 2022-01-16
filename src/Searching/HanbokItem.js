import React, {useState} from 'react'

const HanbokItem = ({index, item, onView}) => {

    const {gs_name, gs_kind, gs_maker, gs_position} = item

    return(
        <tr onClick={() => onView(item)}>
            <td>{index}.</td>
            <td>{gs_maker}</td>
            <td>{gs_position}</td>
            <td>{gs_name}</td>
            <td>{gs_kind}</td>
        </tr>
    )
}

export default HanbokItem;