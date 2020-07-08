import React from 'react'

 export default function Footer(props:any){
    return(
        <footer>
            <button 
                onClick={props.recoverItem} 
                className={props.usable === 0 ? 'disabled':''}
            >恢复</button>
            <button 
                onClick={props.removeItem} 
                className={props.usable === 0 ? 'disabled':''}
            >删除</button>
        </footer>
    )
 }