import './App.css';
import { List, MapPinXInside } from 'lucide-react';
import { Pencil } from 'lucide-react';

import uniqid from 'uniqid';
import { useState } from 'react';
const App = ()=>{
    const[list,setList]=useState([]);
    const[task,setTask]=useState("");
    const[te,setTe]=useState("");
    const[uni,setUni]=useState([]);
    const[editPen,setEditpen]=useState(null)
   
    const carrier =(e)=>{
        setTask(e.target.value);
    }
    const area = (e)=>{
        setTe(e.target.value);
    }
    const addtask = ()=>{
       setList([...list, { title: task, description: te, id: uniqid(),checked:false }]);
        setTask("");
        setTe("");
    }
    const onEnter = (e)=>{
        if(e.key=="Enter"){
            addtask();

        }
           
    }
    const onDelete =()=>{
        const del = [...list];
        del.pop();
        setList(del);
    }
    const removeall =(index)=>{
        const copy=[...list]
        copy.splice(index,1)
        setList(copy);
    }
    const onChecked =(e,id)=>{
        const listIndex = list.findIndex(item =>
            item.id == id)
        
        if(e.target.checked){
            setUni([...uni,id]);
            const listCopy = [...list]
            listCopy[listIndex].checked = true;
            setList(listCopy);

            


        }
    
        else{
            const listCopy = [...list]
            listCopy[listIndex].checked = false;
            setList(listCopy);

            const count = uni.filter(item => item!==id)
            // const index = uni.findIndex(item => item == id);
            // count.splice(index,1)
            setUni(count);
            
        }
    }
    

    
    
    const onAll =()=>{
        const copy=[...list];
        console.log(copy);
        const rem=copy.filter((item)=>{
            return !uni.includes(item.id);
        });
        setList(rem);
    }
    const onSaveEdit =()=>{
         const listIndex=list.findIndex(listitem => listitem.id == editPen);
         const listcopy = [...list]
         listcopy[listIndex]={...listcopy[listIndex],title:task,description:te};
         setList(listcopy);
         setEditpen(null);
         setTask("");
         setTe("");

    }
    

    const onEdit =id=>{
       setEditpen(id);
          const listIndex=list.findIndex(listitem => listitem.id == id);
          setTask(list[listIndex].title);
          setTe(list[listIndex].description)

    }


    return <div className='container'>
        <h1 className='text'>My Todo</h1>
        <div className="box">
        <input type="text" className='in'placeholder='Enter your task' onChange={carrier} onKeyDown={onEnter} value={task}></input>
        <textarea row={10} className='textarea' onChange={area} onKeyDown={onEnter} value={te}></textarea>
        <div className="forb">
        <button className='btn1' onClick={editPen?onSaveEdit:addtask}>{editPen?"EDIT":"Add"}</button>
        <button className='btn2' onClick={onDelete}>Delete</button>
          <button className='btn3' onClick={onAll}>Remove</button>
        </div>
        </div>
        {list.map((item,i)=>{
           return <div className="resbo">
            <input type="checkbox" className='check' onChange={e =>{onChecked(e,item.id,i)
            }}
            checked={item.checked}/>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
              <MapPinXInside  className="pin" onClick={()=>{
                removeall(i)
              }}/>
               <Pencil className="pen" onClick={()=>{
                onEdit(item.id);

               }} />

           </div>
            
        })}
    </div>
}

export default App;