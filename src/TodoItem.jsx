import React, { useEffect } from 'react'
function TodoItem(props) {
    const id = props.data.id;
    useEffect(() => {
        if (props.data.condition) {
            document.getElementById(id).style.opacity = 0.5
        }
    })
    return (
        <li>
            <input type="checkbox" id={id} onChange={() => props.change({ type: 'changeItem', id })} checked={props.data.condition} />
            <p>{props.data.value}</p>
            <span onClick={() => props.change({ type: 'deleteItem', id })}>删除</span>
        </li>
    )
}

export default TodoItem
