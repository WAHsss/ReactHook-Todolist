import React,{useRef} from 'react'

export default function TodoInput(props: any) {
    //每次回车提交数据，清空输入框
    const inputRef= useRef(null);
    function handleSubmit(e:any) {
        let node:any  = inputRef.current
        if (node.value !== '') {
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
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="请添加事项"
                        required={true}
                    />
                </form>
            </section>
        </header>
    )
}