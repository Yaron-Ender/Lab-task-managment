import { useDocument } from "../../hooks/useDocument";
import cancel from '../../asstes/cancel.svg';
import AddTest from "./addTest";
import Button from "../../component/button/button";
import { useEffect,useState,useCallback } from "react";
import { useRef } from "react";
export default function AddProjectMono({ projName, handleTestFields, deleteMonograph }) {
  const { error, document } = useDocument("substances",projName);
  const [monographList, setMonograpghList] = useState([]);
  const buildObjBasedDocument =useRef()

  const buildMonographList = useCallback(() => {
    const arr = [];
    Object.keys(document).forEach((m) => {
      arr.push(m);
    });
    setMonograpghList(arr);
  }, [document]);
  // const buildMonographList =()=>{
  // const arr=[]
  //  Object.keys(document).forEach((m) => {
  //   arr.push(m);
  //   });
  //   setMonograpghList(arr)
  // }
  
  useEffect(() => {
    if (document) {
      buildObjBasedDocument.current = document;
      setMonograpghList([]);
      buildMonographList();
      Object.keys(document).forEach((m) => {
        // const edition = document[m]["monographEdition"];
        // const monographAndEdition = `${m}/${edition}`;
        //handleTestField function is get calles also from AddTest,because that we pass empt string
        handleTestFields(m, "");
      });
    }
  }, [document, projName,buildMonographList, handleTestFields]);

  const handleClick = (monoTitle) => {
    deleteMonograph( monoTitle);
  setMonograpghList((prev)=>(prev.filter((m)=>m!==monoTitle)))
  };
  return (
    <>
  <div>
    {projName && <h2>{projName}</h2>}
     <Button type="submit" children="Add Project" buttontype="addProject" />
  </div>
<div className="projName-and-select-mono-container">
{document &&
  monographList.map((monoTitle) => (
  <div
    key={buildObjBasedDocument.current[monoTitle]["id"]}
    className="assign-mono-box"
  >
  {document[monoTitle]&&
  <h3 className="mono-title">
  {monoTitle}/{document[monoTitle]["monographEdition"]}
     <img
     alt="cancel-icon"
      className="cancel-icon"
      src={cancel}
      onClick={() => {
        handleClick(monoTitle);
      }}
      />
  </h3>
    }
    {/* try to add the img as content to h3 */}

    {Object.keys(buildObjBasedDocument.current[monoTitle].tests).map(
  (tech) => (
    <div className="assign-technology-box" key={tech}>
      <h4>{tech}</h4>

      {buildObjBasedDocument.current[monoTitle].tests[tech].map(
      (test,index) => (
        <AddTest
           key={index}
          handleTestFields={handleTestFields}
          monoTitle={monoTitle}
          tech={tech}
          test={test}
          substanceDoc={document}
        />
      )
    )}
  </div>
    )
     )}
        </div>
          ))}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}