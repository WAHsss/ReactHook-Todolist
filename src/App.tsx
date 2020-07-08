import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import Footer from './Footer'

import Store from './util/store'

import './style/todolist.scss'

type listItem = {
    id: number;
    condition: boolean;
    value: string
}
interface StringArray {
    [index: string]: any;
}
function App() {
    //状态过滤
    const [underwayList, setUnderwayList] = useState<listItem[]>([])
    const [doneList, setDoneList] = useState<listItem[]>([])
    const [deleteList, setDeleteList] = useState<listItem[]>([])
    const [checkList, setCheckList] = useState<number[]>([])
    //将字符串与对应的set方法对应
    const config: StringArray = {
        'underwayList': {
            fn: setUnderwayList,
            list: underwayList
        },
        'deleteList': {
            fn: setDeleteList,
            list: deleteList
        },
        'doneList': {
            fn: setDoneList,
            list: doneList
        },
        'checkList': {
            fn: setCheckList,
            list: checkList
        }
    }
    //const keys = ['underwayList','deleteList','doneList','checkList']
    useEffect(() => {
        //从本地取出数据，更新每个state
        // setCheckList(Store.get('checkList'))
        // setDeleteList(Store.get('deleteList'))
        // setDoneList(Store.get('doneList'))
        // setUnderwayList(Store.get('underwayList'))
        for (let keys in config) {
            config[keys].fn(Store.get(keys))
        }
    }, []);
    /**根据传入的字符串数组，自动化更新state和本地数据
     * @method setNewState
     * @param names:string[]
     */
    function setNewState(name: string) {
        let item = config[name]
        //调用list对应的set函数
        item.fn([...item.list])
        Store.set(name, item.list)
    }
    /**添加新项目
     * @method addItem
     * @param value 
     */
    function addItem(value: string): void {
        underwayList.push({
            id: Math.floor(Math.random() * 1000),
            condition: false,
            value
        });
        setNewState('underwayList')
    }
    /**找到项目修改的索引
     * @method findItemIndex
     * @param id 
     * @param list 要查询的数组
     */
    function findItemIndex(id: number, list: listItem[]): number {
        //使用findIndex减少判断的次数
        return list.findIndex((value: listItem, index: number) => value.id === id)
    }
    /**把item放入回收站
     * @method changeDeleteItem
     * @param id 
     * @param list underwayList | deleteList
     */
    function changeDeleteItem(id: number, list: listItem[]) {
        let index: number = findItemIndex(id, list)
        //把删除的元素添加到deleteList
        deleteList.push(list.splice(index, 1)[0])
        setNewState('deleteList')
        setNewState('underwayList')
        setNewState('doneList')
    }
    /**修改item完成的状态
     * @method changeActionItem 首先修改condition，然后删除原来数组中的item并加入到对应的数组
     * @param id 
     * @param list 
     */
    function changeActionItem(id: number, list: listItem[]) {
        let index: number = findItemIndex(id, list);
        let item: listItem = list[index]
        item.condition = !item.condition
        list.splice(index, 1)
        item.condition ? doneList.push(item) : underwayList.push(item)
        setNewState('underwayList')
        setNewState('doneList')
    }
    /**删除回收站被选中的数组
    *@method removeItem 
    */
    function removeItem(): void {
        checkList.forEach((id: number, index: number) => {
            deleteList.splice(findItemIndex(id, deleteList), 1)
        })
        //需要清空checkList
        checkList.length = 0
        setNewState('checkList')
        setNewState('deleteList')
    }
    /**修改回收站里选中的内容
     * @method changeCheckList
     * @param {id} 被选中的id
     */
    function changeCheckList(id: number): void {
        let index: number = checkList.indexOf(id)
        if (index === -1) {
            checkList.push(id)
        } else {
            checkList.splice(index, 1)
        }
        setNewState('checkList')
    }
    /** 恢复回收站中被选中的内容
     * @method recoverItem
     */
    function recoverItem(): void {
        checkList.forEach((id: number, index: number) => {
            let delIndex: number = findItemIndex(id, deleteList)
            if (deleteList[delIndex].condition) {
                doneList.push(deleteList.splice(delIndex, 1)[0])
            } else {
                underwayList.push(deleteList.splice(delIndex, 1)[0])
            }
        })
        //清空checkList
        checkList.length = 0
        setNewState('underwayList')
        setNewState('doneList')
        setNewState('deleteList')
        setNewState('checkList')
    }
    return (
        <>
            <TodoInput addItem={addItem} />
            <TodoList
                data={{ list: underwayList }}
                listType='underway'
                changeActionItem={changeActionItem}
                changeDeleteItem={changeDeleteItem}
                name="正在进行"
            />
            <TodoList
                data={{ list: doneList }}
                listType='done'
                changeDeleteItem={changeDeleteItem}
                changeActionItem={changeActionItem}
                name="已经完成"
            />
            <TodoList
                data={{ list: deleteList, checkList }}
                listType='recycle'
                changeCheckList={changeCheckList}
                name="回收站"
            />
            <Footer
                removeItem={removeItem}
                recoverItem={recoverItem}
                usable={checkList.length}
            />
        </>
    )
}
export default App