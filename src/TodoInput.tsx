import React from 'react'

export default function TodoInput(props) {
    function handleSubmit(e) {
        let target = e.target || e.srcElement;
        console.log(target.children)
        let node = target.children[1]
        if(node.value !== ''){
            props.addItem(node.value)
            node.value = ''
            node.focus()
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