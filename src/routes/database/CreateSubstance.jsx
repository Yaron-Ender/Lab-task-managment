import React from "react";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Button from "../../component/button/button";
import SingelTech from "./SingelTech";
import MonoInput from "../../component/input/MonoInput";
import Select from 'react-select';
import { useFriestore } from "../../hooks/useFirestore";
import { useStyle } from "../../hooks/useStyle";
const CreateSubstance = ({ closeCreateSubstanceComp }) => {
  const { addDocument } = useFriestore("substances");
  const technologies = [
    { value: "HPLC", label: "HPLC" },
    { value: "WET", label: "WET" },
    { value: "GC", label: "GC" },
  ];
  class Mono {
    constructor(name, eddition, date, tech, note) {
      this.id = this.id();
      this.monographName = name;
      this.monographEdition = eddition;
      this.effectiveDate = date;
      this.tech = tech;
      this.openNote = false;
      this.note = note;
      this.tests = {
        HPLC: [],
        WET: [],
        GC: [],
      };
    }
    id() {
      return Math.random();
    }
    openTextarea() {
      this.openNote = true;
    }
  }
  //STATES
  const [show, setShow] = useState(false);
  const [substanceName, setSubstanceName] = useState("");
  const [monograph, setMonograph] = useState([]); //All the monograpes that the user create
  const [openTextareaPannel, setOpenTextareaPannel] = useState(false);
  const { selectCompCreateSunstanceStyle } = useStyle();
  //FUNCTIONS
  //take the monograph state that store all the monograpgh data and convert it to an object that could be stored in firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (substanceName&&monograph.length>0) {
      let monoNamesArr = [];
      const monographObj = new Object();
      //step 1 - create an array with monograph names
      monograph.forEach((monograph) => {
        if (!monoNamesArr.includes(monograph.monographName)) {
          monoNamesArr.push(monograph.monographName);
        }
      });
      //step 2 - iterate throuth monograph and add to the monographObj the monographName as a property
      for (let i = 0; i < monoNamesArr.length; i++) {
        let individualMono = {
          ...monograph.filter((mono) => mono.monographName == monoNamesArr[i]),
        };
        let {id,monographEdition, effectiveDate, note, tests } =
          individualMono["0"];
        //delete empty technology
          Object.keys(tests).forEach((tech)=>{
           if(tests[tech].length==0){
             delete tests[tech]
           }
          })
        monographObj[monoNamesArr[i]] = {
        id,
          monographEdition,
          effectiveDate,
          note,
          tests,
        };
      }
      await addDocument(substanceName, monographObj);
      closeCreateSubstanceComp();
    }
  };
  //add the individual monograph to state that store all the monographes
  const addMonograph = (e) => {
    const mono = new Mono("", "", "", [], "");
    setMonograph((prev) => [...prev, mono]);
    setShow(true);
    setOpenTextareaPannel(false);
  };
  //remove spesific monograph from the monogrphs state container
  const removeMonograph = (id) => {
    setMonograph((prev) => prev.filter((item) => item.id !== id));
  };
  //handle with input of the monograph name
  const handleMonographInput = (e, id) => {
    monograph.forEach((item) => {
      if (item.id === id) {
  switch (e.target.name) {
    case "monographName":
      item.monographName = e.target.value;
      break;
    case "edition":
      item.monographEdition = e.target.value;
      break;
    case "date":
      item.effectiveDate = Timestamp.fromDate(new Date(e.target.value));
      break;
    default:
      return;
  }
      }
    });
  };
  // handle with the Select comp
  const handleSelectOption = (op, id) => {
    //op is the option object that store in array that come from the Select
    let arr = [];
    monograph.forEach((item) => {
      if (item.id === id) {
        item.tech = [];
        op.forEach((optionValue) => {
          item.tech.push(optionValue.value);
          arr.push(item.tech);
        });
        ["HPLC", "WET", "GC"].forEach((i) => {
          if (!item.tech.includes(i)) {
            item.tests[i] = [];
          }
        });
      }
      //test state doesn't do nothing, it just for make the jsx tamplte rerender
    });
    setMonograph((prev) => [...prev]);
  }; //end
  //open the textarea
  const handleTextareaPanel = (id) => {
    monograph.forEach((item) => {
      if (item.id === id) {
        item["openNote"] = true;
        console.log(item);
        setOpenTextareaPannel(true);
      }
    });
  };
  const handletextareaContent = (e, id) => {
    const text = e.target.value;
    monograph.forEach((item) => {
      if (item.id === id) {
        item["note"] = text;
      }
    });
  };
  //function that update the tests object,it get called from SingleTest Comp and pass "testList"
  const updateTests = (id, testList) => {
    monograph.forEach((item) => {
     if (item.id === id) {
    Object.keys(testList).forEach((technology) => {
   if (testList[technology].length > 0) {
    item.tests[technology] = testList[technology];
    }
    });
        setMonograph((prev) => [...prev]);
      }
    });
  };
  // *********************************
  return (
    <div className="create-Newsubstance-container">
      <h1>Cretae New Substance</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
    <header>
    <div>
      <MonoInput
      span='add substance Title'
       placeholder= ' '
        type="text"
        name="sustanceTitle"
        value={substanceName}
        className='input-mono-container'
        onChange={(e) => {
        setSubstanceName(e.target.value);
        }}
      />
      <Button
        buttontype="createSubstance"
        type="button"
        onClick={addMonograph}
        children={"add monograph"}
      />
    </div>
      <Button
       buttontype="createSubstance"
        children={"save monograph"}
         />
  </header>
   <div className={`${show ? "show" : ""} monographes-container`}>
  {monograph.length > 0 &&
    monograph.map((item) => (
      <div className="singel-monograph" key={item.id}>
    <div className="general-details">
  <MonoInput
    span="monograph"
    type="text"
    name="monographName"
    onKeyUpCapture={(e) => {
      handleMonographInput(e, item.id);
    }}
    required
  />
  <MonoInput
    span="edition"
    type="number"
    name="edition"
    onChange={(e) => {
      handleMonographInput(e, item.id);
    }}
    required
  />
  <MonoInput
    span="effective date"
    type="date"
    name="date"
    onChange={(e) => {
      handleMonographInput(e, item.id);
    }}
    required
  />
    </div>
  {/* tech section */}
  <div className="select-tech">
    <p>select Tech</p>
    <Select
    styles={selectCompCreateSunstanceStyle}
      onChange={(option) => {
        handleSelectOption(option, item.id);
      }}
      options={technologies}
      isMulti
    />
    {item.tech.map((technology) => (
      <SingelTech
        key={technology}
        technology={technology}
        id={item.id}
        updateTests={updateTests}
        monograph={monograph}
      />
    ))}
  </div>
  {/* textarea */}
<div className="add-note-container">
  <p>
    add Note
    <Button
      buttontype="openTextarea"
      type="button"
      onClick={() => {
        handleTextareaPanel(item.id);
      }}
      children="&#9547;"
    />
  </p>
  {item["openNote"] && (
    <textarea
      className="note-textarea"
      onKeyUpCapture={(e) => {
        handletextareaContent(e, item.id);
      }}
    ></textarea>
  )}
</div>
  {/* end of textarea */}
  <Button
  onClick={() => {removeMonograph(item.id)}}
  children={"remove monograph"}
  buttontype='remove'
  />
</div>
))}
</div>
</form>
    </div>
  );
};

export default CreateSubstance;