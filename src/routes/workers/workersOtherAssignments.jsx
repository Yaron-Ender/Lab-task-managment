import { useEffect, useRef, useState, Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersOtherAssignments = ({ assignmentID, profession, userID }) => {
const { document} = useDocument("assignments", assignmentID);
const [rerender, setRerender] = useState("");
const otherAssignmentObj = useRef({
  projectName: "",
  profession,
  test:[],
  userName: [],
  duedate: "",
  monograph: "", 
  supervisor:'',
}).current;
useEffect(()=>{
  if(document){
otherAssignmentObj.projectName = Object.keys(document)
Object.values(Object.values(document)).forEach((monographesObj)=>{
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
if(monoPlusTechArr[1]){
  otherAssignmentObj.monograph=monoPlusTechArr[0]
  Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr)=>{
  if (techAndTestArr[0] !== profession){
    Object.entries(techAndTestArr[1]).forEach((testAdnDetArr)=>{
      console.log(testAdnDetArr)
  otherAssignmentObj.test = [...otherAssignmentObj.test, testAdnDetArr[0]];
  otherAssignmentObj.duedate = testAdnDetArr[1].dueDate;
  otherAssignmentObj.comments = testAdnDetArr[1].comments;
  otherAssignmentObj.supervisor = testAdnDetArr[1].supervisor['name'];
  otherAssignmentObj.userName=[... otherAssignmentObj.userName,{[testAdnDetArr[0]]:testAdnDetArr[1]['workers']}]
  setRerender(testAdnDetArr[0]);
})
}
})
}
})
})
}
},[document,profession,otherAssignmentObj])
return (
<div>
{rerender&&otherAssignmentObj.test.length>0&&otherAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
 <div>
{otherAssignmentObj.projectName&&<h3>{otherAssignmentObj.projectName}</h3>}
<h3>dueDate :{otherAssignmentObj.duedate} </h3>
 </div>
<h3>{otherAssignmentObj.monograph} -{test} {otherAssignmentObj.userName[0].workerName}</h3>
{otherAssignmentObj.userName.map((testAndWorkerObj,index)=>(
<Fragment key={index}>
{testAndWorkerObj[test]&&testAndWorkerObj[test].map((nameObj,index)=>(
<h3 key={index}>{nameObj.workerName}</h3>
))}
</Fragment>
))}

<div>
{(otherAssignmentObj.supervisor)?<h3>supervisor:{otherAssignmentObj.supervisor}</h3>:<span>no supervisor has been set yet</span>}
</div>
</Fragment>
))
}
<hr />
</div>
  );
};

export default WorkersOtherAssignments;