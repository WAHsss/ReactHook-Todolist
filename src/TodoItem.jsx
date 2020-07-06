import React from 'react'
function TodoItem(props) {
    const id = props.data.id;
    //根据状态选择更改checked
    function Ischecked(){
        if(props.data.condition === 'underway'){
           return <input type="checkbox" onChange={()=>props.change.changeItem(id)}/>
        }

        return  <input type="checkbox" onChange={()=>props.change.changeItem(id)} checked/>
        
    }
    return (
        <li>
            <Ischecked/>
            <p>{props.data.value}</p>
            <span onClick={()=>props.change.deleteItem(id)}>-</span>
        </li>
    )
}

export default TodoItem
