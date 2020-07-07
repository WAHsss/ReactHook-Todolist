import React, { useState } from 'react'
import TodoList from './TodoList.jsx'
import TodoInput from './TodoInput.jsx'
import Footer from './Footer'

import './css/todolist.css'

function App() {
    //状态过滤
    const [underwayList, setUnderwayList] = useState([])
    const [doneList, setDoneList] = useState([])
    const [deleteList, setDeleteList] = useState([])
    const [checkList, setCheckList] = useState([])
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
    //把item放入回收站
    function deleteItem(id, list) {
        let index = findItemIndex(id, list)
        //把删除的元素添加到deleteList
        setDeleteList(deleteList.concat(list.splice(list[index], 1)))
        setUnderwayList([...underwayList])
        setDoneList([...doneList])
    }
    //修改item的状态,首先找到索引，然后修改完成状态，修改item
    function changeItem(id, list) {
        let index = findItemIndex(id, list);
        let item = list[index]
        item.condition = !item.condition
        list.splice(index, 1);
        item.condition ? doneList.push(item) : underwayList.push(item)
        setUnderwayList([...underwayList])
        setDoneList([...doneList])
    }
    /**删除回收站被选中的数组
    *@method removeItem 
    *@for 无
    *@param {rfList} 回收站选中的item列表，[id1,id2,...] *
    *@returns {void}
    */
    function removeItem(checkList) {
        checkList.forEach((ele, index) => {
            deleteList.splice(findItemIndex(ele, deleteList), 1)
        })
        setCheckList([])
        setDeleteList([...deleteList])
    }
    /**修改回收站的选中的内容
     * @method changeCheckList
     * @for 无
     * @param {id} 被选中的id
     * @returns {void}
     */
    function changeCheckList(id) {
        let index = checkList.indexOf(id)
        if (index === -1) {
            checkList.push(id)
        } else {
            checkList.splice(index , 1)
        }
        console.log(checkList)
        setCheckList([...checkList])
    }
    /** 恢复回收站中被选中的内容
     * @method recoverItem
     * @for 无
     * @param {rcList} 回收站中选中的item列表, [id1,id2,...] *
     * @returns {void}
     */
    function recoverItem() {
        checkList.forEach((ele, index) => {
            let delIndex = findItemIndex(ele, deleteList)
            if (deleteList[delIndex].condition) {
                doneList.concat(deleteList.splice(delIndex, 1))
            } else {
                underwayList.concat(deleteList.splice(delIndex, 1))
            }
        })
        setCheckList([])
        setDeleteList([...deleteList])
        setDoneList([...doneList])
        setUnderwayList([...underwayList])
    }
    return (
        <>
            <TodoInput addItem={addItem} />
            <TodoList data={{ list: underwayList }} type='underway' change={{ deleteItem, changeItem }} name="正在进行" />
            <TodoList data={{ list: doneList }} type='done' change={{ deleteItem, changeItem }} name="已经完成" />
            <TodoList data={{ list: deleteList, checkList }} type='recycle' change={{ changeCheckList }} name="回收站" />
            <Footer change={{removeItem,recoverItem}} usable={checkList.length}/>
        </>
    )
}
export default App