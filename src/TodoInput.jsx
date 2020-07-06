import React, { useEffect } from 'react'

export default function TodoInput(props) {
    let node;
    useEffect(()=>{
        node = document.querySelector('input');
        node.value = ''
        node.focus()
    })
    function handleSubmit(e) {
        if(node.value !== ''){
            props.addItem(node.value)
        }
        e.preventDefault();
    }
    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <label>TodoList</label>
                    <input type="text" placeholder="请添加事项" required="required" />
                </form>
            </section>
        </header>
    )
}