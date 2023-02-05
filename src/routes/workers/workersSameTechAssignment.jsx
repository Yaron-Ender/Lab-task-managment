import { useEffect,useRef,useState,Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
import { format } from "date-fns";

const WorkersSameTechAssignment = ({ assignmentID,profession,userID,docNum }) => {
const { document} = useDocument('assignments',assignmentID)
const [rerender, setRerender] = useState("");
const [restrictUseEffectIteration,setRestrictUseEffectIteration]=useState(0)
const otherAssignmentObj = useRef({
  projectName: "",
  profession,
  test: [],
  userName:[],
  duedate: "",
  monograph: "",
  supervisor:'',
}).current;

useEffect(()=>{
  if(document&&restrictUseEffectIteration<=docNum){
  for (let i = 0; i <= docNum; i++) {
  setRestrictUseEffectIteration((prev) => ++prev);
}
otherAssignmentObj.projectName = Object.keys(document)
Object.values(Object.values(document)).forEach((monographesObj)=>{
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
  //check if there a value in the monograph property
  if(monoPlusTechArr[1]){
    otherAssignmentObj.monograph=monoPlusTechArr[0]
    if (monoPlusTechArr[1][profession]){
      Object.entries(monoPlusTechArr[1][profession]).forEach((arr) => {
   arr[1]["workers"].forEach((workerObj) => {
   if (workerObj.workerID !== userID) {
  //rerender state is for make the comp rerender
  otherAssignmentObj.test = [...otherAssignmentObj.test, arr[0]];
  otherAssignmentObj.duedate = arr[1].dueDate;
  otherAssignmentObj.comments = arr[1].comments;
  otherAssignmentObj.supervisor = arr[1].supervisor['name'];
  otherAssignmentObj.userName=[...otherAssignmentObj.userName,{[arr[0]]:arr[1]['workers']}]
  setRerender(arr[0]);
}
});
});
}
}
})
})
}
},[document,docNum,otherAssignmentObj,profession,restrictUseEffectIteration,userID])
return (
<>
{rerender&&otherAssignmentObj.test.length>0&&otherAssignmentObj.test.map((test,index)=>(
<Fragment key={index}>
<div className="workers-same-tech-singel-test-card">
{otherAssignmentObj.duedate&&
<h4>{format(new Date(otherAssignmentObj.duedate),'EEEE - MM/dd/yyyy')}</h4>
}
<div className="same-tech-Assignments-proj-test-box">
{otherAssignmentObj.projectName&&<h4>{otherAssignmentObj.projectName}</h4>}
<h4>{test}</h4>
</div>
<h4><span>methode : </span>{otherAssignmentObj.monograph}</h4>
 {otherAssignmentObj.userName.length>0&&otherAssignmentObj.userName.map((testAndWorkerObj,index)=>(
<Fragment key={index}>
{testAndWorkerObj[test]&&testAndWorkerObj[test].map((nameObj,index)=>(
<h4 key={index}><span>worker : </span>{nameObj.workerName}</h4>
))}
</Fragment>
 ))}
{(otherAssignmentObj.comments)?<h4><span>comments : </span>{otherAssignmentObj.comments}</h4>:<span>no comments</span>}
{(otherAssignmentObj.supervisor)?<h4><span>supervisor : </span>{otherAssignmentObj.supervisor}</h4>:<span>no supervisor has been set yet</span>}
</div>
</Fragment>
)) 
}
</>
  );
};

export default WorkersSameTechAssignment;