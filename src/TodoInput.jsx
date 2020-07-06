import React from 'react'

//回车后记录TodoList
function handleKeyDown(e, props) {
    let evt = e || window.event;
    let node = evt.target || evt.srcElement;
    if (evt.keyCode === 13) {
        props.changeList(node.value)
        node.value=''
        node.focus()
    }
}

export default function TodoInput(props) {
    return (
        <header>
            <section>
                <label>TodoList</label>
                <input type="text" placeholder="请添加事项" onKeyDown={(e) => handleKeyDown(e, props)} />
            </section>
        </header>
    )
}