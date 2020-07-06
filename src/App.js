import React, { useState } from 'react'
import TodoList from './TodoList.jsx'
import TodoInput from './TodoInput.jsx'
import './css/todolist.css'
function App() {
    const [underwayList, setUnderwayList] = useState([])
    const [doneList, setDoneList] = useState([])
    //状态过滤
    //正在进行和未完成的数量和数组
    let deleteList = []
    //添加新项目
    function addItem(value) {
        underwayList.push({
            id: parseInt(Math.random() * 1000),
            condition: false,
            value
        })
        setUnderwayList([...underwayList])
    }
    //找到要项目修改的索引
    function findItemIndex(id, list) {
        let i;
        list.forEach((value, index) => {
            if (value.id === id)
                i = index
        })
        return i;
    }
    //删除项目
    function deleteItem(id, list) {
        let index = findItemIndex(id, list)
        deleteList.push(list[index])
        list.splice(list[index], 1)
        setUnderwayList([...underwayList])
        setDoneList([...doneList])
    }
    //修改item的状态,首先找到索引，然后修改完成状态，修改item
    function changeItem(id, list) {
        let index = findItemIndex(id, list);
        let item = list[index]
        item.condition = !item.condition
        list.splice(index, 1);
        item.condition ? doneList.push(item) :underwayList.push(item)
        setUnderwayList([...underwayList])
        setDoneList([...doneList])
    }
    return (
        <>
            <TodoInput addItem={addItem} />
            <TodoList data={{ list: underwayList }} change={{ deleteItem, changeItem }} name="正在进行" />
            <TodoList data={{ list: doneList }} change={{ deleteItem, changeItem }} name="已经完成" />
        </>
    )
}
export default App