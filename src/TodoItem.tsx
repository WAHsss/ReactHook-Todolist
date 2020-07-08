import React from 'react'
function TodoItem(props:any) {
    const id = props.data.id;
    function ChooseButton(){
        if(props.listType !== 'recycle'){
            return <span onClick={() => props.change({ fnType: 'deleteItem', id })}>删除</span>
        }
        return (
            <input
                className='recycle-check'
                type="checkbox"
                onChange={() => props.change({ fnType: 'changeCheckList', id })}
                checked={props.checkList.indexOf(id) !== -1}
            />
        )
    }
    return (
        <li style={props.data.condition ? { opacity: 0.5 } : {}}>
            {props.listType === 'recycle' ? <div className='delete-line'></div> : ''}
            <input
                type='checkbox'
                className='done-underway-check'
                style={props.listType==='recycle' ? {cursor: 'not-allowed'}:{}}
                onChange={() => props.change({ fnType: 'changeItem', id })}
                checked={props.data.condition}
            />
            <p>{props.data.value}</p>
            <ChooseButton/>
        </li>
    )
}

export default TodoItem
