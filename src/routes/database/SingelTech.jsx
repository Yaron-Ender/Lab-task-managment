import MonoInput from "../../component/input/MonoInput";
import { useState, useEffect } from "react";
import Button from "../../component/button/button";
import done from "../../asstes/done.svg"
const SingelTech = ({technology,id,updateTests,monograph}) => {
const initObj={
      HPLC:[],
      WET:[],
      GC:[]
   }
const [testList,setTestList]=useState(initObj)
const [text,setText]=useState('')
useEffect(()=>{
updateTests(id,testList)
},[testList])

const handleClick= (e)=>{
if(text){
   setTestList((prev) =>({...prev,[technology]:[...prev[technology],text]}));
 setText("");
}
}
   return (
<>
   {technology &&
    <div className="select-tech-result">
   <h3>{technology}</h3>
   <ul>
   {monograph.length>0&&monograph.map(mono=>(
   mono.id==id&&
   mono.tests[technology]&&
   mono.tests[technology].map(item=>(
    <li key={item}>{item}</li>         
      ))
   ))
   }
   </ul>
   <div className="add-test-container">
   <MonoInput
   className='add-test-input-container'
   type="text"
   span={"add test"}
   onChange={(e)=>{setText(e.target.value)}}
   value={text}
   />
   <Button
  onClick={handleClick}
  type='button'
  buttontype="done" 
  children={<img className="done-img" src={done} alt='done-btn'/>} 
/>
    </div>
    </div>
}
</>
    
    );
};

export default SingelTech;