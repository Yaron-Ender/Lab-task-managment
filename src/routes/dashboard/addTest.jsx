import React from 'react';
import { useDocument } from '../../hooks/useDocument';
import Select from 'react-select';
 import { useRef,useState,useEffect } from 'react';
const AddTest = ({ test,tech, monoTitle, handleTestFields }) => {
  const { document: professionDoc, error } = useDocument("profession", tech);
  const [textArea, setTextArea] = useState("");
  const [workers,setWorkers] = useState([])
  const [date,setDate] =useState('')
  const fields = useRef({});
  fields.current = {
    [monoTitle]:{
    [tech]:{
    [test]: {
      workers: [],
      comments: "",
      dueDate: "",
    }
  }
  }
  };
  useEffect(() => {
    fields.current[monoTitle][tech][test]["comments"] = textArea;
    fields.current[monoTitle][tech][test]["workers"] = workers;
    fields.current[monoTitle][tech][test]["dueDate"] = date;
    if(textArea||date||workers.length>0){
      handleTestFields("",fields.current,tech,test);
    }
  }, [textArea,date,workers]);

  const handleDateORcomment = (e) => {  
    const {name,value} = e.target
  switch(name){
    case 'comment':  
      setTextArea((prev)=>(prev=value));
  break;
  case 'date':
  setDate(value)
   setDate((prev) => (prev = value));
  break;
  default:
    return;
  }
  };
  const handleWorkers = (option) => {
    let workersArr = [];
    option.forEach((o) => {
      workersArr.push(o.value);
    setWorkers(workersArr);
    });
     };

  return (
    <ul>
      <li>
        <h4>{test}</h4>
        {professionDoc && (
          <>
      <Select
        className="select"
        name='workers'
        onChange={(option) => handleWorkers(option)}
        options={professionDoc[tech]}
        isMulti
      />
      <label>
        <span>add comment...</span>
       <textarea
       name='comment'
        type="text"
        onChange={(e) => handleDateORcomment(e)}
        value={textArea}
       ></textarea>
      </label>
      <label>
        <span>Set due date:</span>
        <input
        name='date'
        type="date"
        onChange={(e) => handleDateORcomment(e)}
        />
      </label>
          </>
        )}
      </li>
      {!professionDoc && <span>no workers are registered</span>}
    </ul>
  );
};

export default AddTest;