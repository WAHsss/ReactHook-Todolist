import React from 'react'
import TodoItem from './TodoItem'



function TodoList(props) {
    let underwayNum = 0, doneNum = 0
    props.data.forEach((value, index) => {
        if (value.condition === 'underway') {
            underwayNum+=1
        }else{
            doneNum+=1
        }
    })

    return (
        <>
            <section>
                <h2>正在进行 <span>{underwayNum}</span></h2>
                <ol>
                    {props.data.map((value, index) => {
                        return value.condition === 'underway' ? <TodoItem key={value.id} data={value} change={props.change} /> : ''
                    })}
                </ol>
            </section>
            <section>
                <h2>已经完成<span>{doneNum}</span></h2>
                <ol>
                    {props.data.map((value, index) => {
                        return value.condition === 'done' ? <TodoItem key={value.id} data={value} change={props.change} /> : ''
                    })}
                </ol>
            </section>
        </>
    )
}

export default TodoList
