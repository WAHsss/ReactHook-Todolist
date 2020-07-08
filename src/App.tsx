import React, { useState } from 'react'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import Footer from './Footer'

import './css/todolist.css'

function App() {
    type listItem = {
        id:number;
        condition : boolean;
        value:string
    }
    //状态过滤
    const [underwayList, setUnderwayList] = useState<listItem[]>([])
    const [doneList, setDoneList] = useState<listItem[]>([])
    const [deleteList, setDeleteList] = useState<listItem[]>([])
    const [checkList, setCheckList] = useState<number[]>([])
    //添加新项目
    function addItem(value: string): void {
        underwayList.push({
            id: Math.floor(Math.random() * 1000),
            condition: false,
            value
        });
        setUnderwayList([...underwayList])
    }
    //找到要项目修改的索引
    function findItemIndex(id:number, list:listItem[]):number {
        let i:number= -1;
        list.forEach((value:listItem, index:number) => {
            if (value.id === id){
                i = index
            }
        })
        return i;
    }
    //把item放入回收站
    function deleteItem(id:number, list:listItem[]) {
        let index:number = findItemIndex(id, list)
        //把删除的元素添加到deleteList
        setDeleteList(deleteList.concat(list.splice(index, 1)))
        setUnderwayList([...underwayList])
        setDoneList([...doneList])
    }
    //修改item的状态,首先找到索引，然后修改完成状态，修改item
    function changeItem(id:number, list:listItem[]) {
        let index:number = findItemIndex(id, list);
        let item:listItem = list[index]
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
    function removeItem():void {
        checkList.forEach((id:number, index:number) => {
            deleteList.splice(findItemIndex(id, deleteList), 1)
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
    function changeCheckList(id:number):void {
        let index:number = checkList.indexOf(id) as number
        if (index === -1) {
            checkList.push(id)
        } else {
            checkList.splice(index, 1)
        }
        setCheckList([...checkList])
    }
    /** 恢复回收站中被选中的内容
     * @method recoverItem
     * @for 无
     * @param {rcList} 回收站中选中的item列表, [id1,id2,...] *
     * @returns {void}
     */
    function recoverItem():void {
        checkList.forEach((id:number, index:number) => {
            let delIndex:number = findItemIndex(id, deleteList)
            if (deleteList[delIndex].condition) {
                doneList.push(deleteList.splice(delIndex, 1)[0])
            } else {
                underwayList.push(deleteList.splice(delIndex, 1)[0])
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
            <TodoList data={{ list: underwayList }} listType='underway' change={{ deleteItem, changeItem }} name="正在进行" />
            <TodoList data={{ list: doneList }} listType='done' change={{ deleteItem, changeItem }} name="已经完成" />
            <TodoList data={{ list: deleteList, checkList }} listType='recycle' change={{ changeCheckList }} name="回收站" />
            <Footer change={{ removeItem, recoverItem }} usable={checkList.length} />
        </>
    )
}
export default App