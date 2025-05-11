import React, { useState } from 'react'
interface previewprops {
    isopen: boolean;
    onclose: () => void;
    children: React.ReactNode;
}

const Preview = (props: previewprops) => {

    const [tasks,settasks] = useState(initialtasks)
    const [task,settask] = useState("")

    function handleaddtasks(title:string){
        settasks([...tasks,{
            id: nextId++,
            title : title,
            done: false
        }])
    }

    function deletetasks(id:number){
        settasks(tasks.filter((t) => t.id != id))
    };

    function edittasks(task){
        settasks(
            tasks.map((t) => {
                if(t.id === task.id ){return task}
                else {return t}
            }))
    }

    if(props.isopen===false) {return null};
    return ( 
        <div className='container bg-white text-black h-screen p-5'>
        <div>
        <button onClick={props.onclose}>
        X
        </button>
        I notice there are a few issues with the form handling code. Let me explain what's happening conceptually:

The current code attempts to create a form for adding new tasks, but there are several problems:

1. The `onSubmit` handler is incorrectly calling `handleaddtasks(e)` directly during render. This is wrong for two reasons:
    - You need to create a function that calls `handleaddtasks` when the event occurs
    - The function should prevent default form submission behavior

2. The input field needs a way to track its value (state)

3. The `handleaddtasks` function expects a title string, but the form isn't capturing or passing any input value

For this kind of functionality, you typically need:
- A state variable to track the input value
- A proper form submission handler
- Event handling for the input changes

You'll need to set up state for the input, create proper event handlers, and ensure the form behaves correctly.

I recommend checking React's documentation on forms and controlled components: https://react.dev/reference/react-dom/components/input

Always check the correctness of AI-generated responses.
        <div>
            <label>
                Tasks
            </label>
            <input value = {task} onChange={e => settask(e.target.value)} placeholder='Add a new task'></input>
            <button onClick={() => handleaddtasks(task)}>Add new task</button>
        </div>
        <div>
            {tasks.map((task) => 
                <div key={task.id}>
                    
                <p>{task.title}</p>
                <button onClick={() => deletetasks(task.id)}>Remove task</button>
                </div>
            )}
        </div>


        </div>
        </div>
    );
   
}
 
export default Preview;
let nextId = 3;
const initialtasks = [
    {id:1,title:"Eat food",done:false},
    {id:2,title:"Have some fun",done:false},
    {id:3,title:"Fucking die or get a life",done:true}
]