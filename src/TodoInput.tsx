import React from 'react'

export default function TodoInput(props:any) {
    //每次回车提交数据，清空输入框
    function handleSubmit(e:any) {
        let target = e.target || e.srcElement;
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
                    <input type="text" placeholder="请添加事项" required={true}/>
                </form>
            </section>
        </header>
    )
}