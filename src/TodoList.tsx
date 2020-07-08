import React from 'react'
import TodoItem from './TodoItem'

function TodoList(props: any) {
    const list = props.data.list
    const checkList = props.data.checkList
    //根据每个item返回的修改方法type，调用父组件传过来的函数
    function handleChange({ fnType, id }: { fnType: string, id: number }): void {
        if (!props.change[fnType]) return
        props.change[fnType](id, list)
    }
    return (
        <>
            <section>
                <h2>{props.name} <span>{list.length}</span></h2>
                <ol>
                    {list.map((value: any, index: number) => {
                        return (
                            <TodoItem
                                key={value.id}
                                listType={props.listType}
                                data={value}
                                change={handleChange}
                                checkList={checkList}
                            />)
                    })}
                </ol>
            </section>
        </>
    )
}

export default TodoList
