import React,{ useState, useEffect } from 'react'

function Practice() {

    const [count,setCount] = useState(0);

    useEffect(()=>{
        document.title=`You clicked ${count} times`;
    })

    return (
        <div>
            <button onClick={()=> setCount(count+1)}>Count {count}</button>
        </div>
    )
}

export default Practice
