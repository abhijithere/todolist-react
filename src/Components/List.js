import React,{useState,useEffect} from 'react'
import "../index.css"
import './style.css'
const getLocalData =()=>{
    const lists=localStorage.getItem("mytodolist")
    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }
}
function List() {
    const [inputdata,setInputdata]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [myid,setmyid]=useState("")
    const [toggleButton,setTogglebutton]=useState(false);
    const [queary,setqueary]=useState("");
    console.log(queary)
    const addItem=()=>{
        if(!inputdata){
            alert("please fill the input data");
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===myid){
                        return{...curElem,name:inputdata};
                    }
                    return curElem;
                })
            );
            setInputdata("")
            setmyid(null);
            setTogglebutton(false);

        }
        else{
            const myNewInputdata ={
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItems([...items,myNewInputdata]);
            setInputdata("");
        }
    }
    const deleteItem=(id)=>{
        const updatedItem= items.filter((curElem)=>{
            return curElem.id !==id;
        })
        setItems(updatedItem)
    }
    const editItem =(id)=>{
        items.filter((curElem)=>{
            if(curElem.id===id){
                setInputdata(curElem.name)
                setmyid(id);
            }
        })
        setTogglebutton(true)
    }
    const clearall=()=>{
        setItems([])
    }
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items]);
  return (
    <>
    <div className='flex flex-col justify-center items-center mt-28 gap-6'>
        <img src="./img/to-do-list.png" className='h-32 max-[340px]:h-24'></img>
        <p className='text-2xl max-[340px]:text-xl' >Add items to your list 👋</p>
        <add className='flex  justify-end items-center'>
        <input type='text' placeholder="✍ Add Item" className='w-96 h-14 shadow-lg rounded-lg border px-5 text-xl text-slate-500  max-[410px]:w-80 max-[340px]:w-64'
        value={inputdata}
        onChange={(e)=>setInputdata(e.target.value)}
        ></input>
        {
            toggleButton?  <i className="far fa-edit add-btn   text-green-500 cursor-pointer text-xl absolute p-5" onClick={addItem}></i>:<i className="fa fa-plus add-btn absolute p-5 text-slate-600 hover:text-green-500 cursor-pointer" onClick={addItem}></i>      
        }
        </add>
        {/* search */}
        <add className='flex  justify-end items-center'>
        <input type='text'  placeholder="Search items ..." className='w-96 h-14 shadow-lg rounded-lg border px-5 text-xl text-slate-500 
        max-[410px]:w-80 max-[340px]:w-64'
        onChange={(e)=>setqueary(e.target.value)}
        />
        <img src='./img/search.png' className='h-7 absolute px-4'></img>
 </add>
        {/* search  */}

        {/* created list  */}
        {
            items.filter((curElem)=>{
                return queary.toLowerCase()=== ''?curElem : curElem.name.toLowerCase().includes(queary);
            }).map((curElem)=>{
                    return (
                        <add className='flex  justify-between  items-center bg-white w-96 h-14 shadow-lg rounded-lg border px-6 text-xl text-slate-600 max-[410px]:w-80 max-[340px]:w-64' key={curElem.id}>
            <h className='text-xl text-slate-500'>{curElem.name}</h>
            <icons className=''>
        <i className="far fa-edit add-btn   text-green-500 cursor-pointer text-xl" onClick={()=>editItem(curElem.id)}></i>
        <i className="far fa-trash-alt add-btn ml-5  text-red-500 cursor-pointer text-xl" onClick={()=>deleteItem(curElem.id)} ></i>
        </icons>

        </add> 
                    )
            })
        }
        {/* <add className='flex  justify-between  items-center bg-white w-96 h-14 shadow-lg rounded-lg border px-6 text-xl text-slate-600'>
            <h className='text-xl text-slate-500'>apple</h>
            <icons className=''>
        <i className="far fa-edit add-btn   text-green-500 cursor-pointer text-xl" ></i>
        <i className="far fa-trash-alt add-btn ml-5  text-red-500 cursor-pointer text-xl" ></i>
        </icons>

        </add> */}

        {/* created list end */}
        <showitems>
            <button className='h-14 w-44  shadow-lg text-lg bg-green-50 border rounded-sm text-gray-600 mb-9' onClick={clearall}>Clear All</button>
        </showitems>
    </div>

    </>
  )
}

export default List
