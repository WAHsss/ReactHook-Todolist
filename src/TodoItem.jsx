import React from 'react'
function TodoItem(props) {
    const id = props.data.id;
    function ChooseButton(){
        if(props.type !== 'recycle'){
            return <span onClick={() => props.change({ type: 'deleteItem', id })}>删除</span>
        }
        return (
            <input
                className='recycle-check'
                type="checkbox"
                onChange={() => props.change({ type: 'changeCheckList', id })}
                checked={props.checkList.indexOf(id) !== -1}
            />
        )
    }
    return (
        <li style={props.data.condition ? { opacity: 0.5 } : {}}>
            {props.type === 'recycle' ? <div className='delete-line'></div> : ''}
            <input
                type='checkbox'
                className='done-underway-check'
                style={props.type==='recycle' ? {cursor: 'not-allowed'}:{}}
                id={id}
                onChange={() => props.change({ type: 'changeItem', id })}
                checked={props.data.condition}
            />
            <p>{props.data.value}</p>
            <ChooseButton/>
        </li>
    )
}

export default TodoItem
