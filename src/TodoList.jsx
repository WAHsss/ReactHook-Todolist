import React from 'react'
import TodoItem from './TodoItem'

function TodoList(props) {
    const list = props.data.list;
    //根据每个item返回的修改方法type，调用父组件传过来的函数
    function handleChange({type,id}){
        props.change[type](id,list)
    }
    return (
        <>
            <section>
                <h2>{props.name} <span>{list.length}</span></h2>
                <ol>
                    {list.map((value, index) => {
                        return <TodoItem key={value.id} data={value} change={handleChange} />
                    })}
                </ol>
            </section>
        </>
    )
}

export default TodoList
