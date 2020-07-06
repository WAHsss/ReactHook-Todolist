import React, { useState } from 'react'
import TodoList from './TodoList.jsx'
import TodoInput from './TodoInput.jsx'
import './css/todolist.css'
function App() {
    const [list, setlist] = useState([]);
    //添加新项目
    function changeList(value) {
        list.push({
            id: parseInt(Math.random()*1000),
            condition: 'underway',
            value
        })
        setlist([...list])
    }
    //找到要项目修改的索引
    function findItemIndex(id){
        let i;
        list.forEach((value, index) => {
            if (value.id === id)
                i = index
        })
        return i;
    }
    //删除项目
    function deleteItem(id) {
        list.splice(findItemIndex(id),1)
        setlist([...list])
    }
    //修改项目的状态
    function changeItem(id){
        let item = list[findItemIndex(id)]
        if(item.condition ==='underway'){
            item.condition = 'done'
        }else{
            item.condition = 'underway'
        }
        setlist([...list])
    }
    return (
        <>
            <TodoInput changeList={changeList} />
            <TodoList data={list} change={{deleteItem,changeItem}}/>
        </>
    )
}
export default App