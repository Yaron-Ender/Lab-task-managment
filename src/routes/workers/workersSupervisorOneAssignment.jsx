
import {useState,Fragment,useEffect } from "react";
import { format } from "date-fns";
import { useFriestore } from "../../hooks/useFirestore";
const WorkersSupervisorOneAssignment = ({ supervisorObj, assignmentID }) => {
const { updateProjectStatusBySupervisor } = useFriestore('assignments');
const {proj,test,monograph,workers,comments,dueDate,status} = supervisorObj
const handelFirestore = async (supervisorObj) => {
  await updateProjectStatusBySupervisor(supervisorObj,assignmentID);
};

const handleStatus = (e)=>{
const { name } =e.target;
switch(name){
case 'status-done':
if(status.done===true){
supervisorObj["status"]["done"] = false;
 handelFirestore(supervisorObj)
}else{
supervisorObj["status"]["done"] = true;
handelFirestore(supervisorObj);
}
break;
case 'status-issue':
 if(status.issue===true){
supervisorObj["status"]["issue"] = false;
 handelFirestore(supervisorObj)
}else{
supervisorObj["status"]["issue"] = true;
handelFirestore(supervisorObj);
} 
break;
default:
break;
}

}
return (
  <div className="supervisor-singel-test">
  <div className="supervisor-card-date-proj-box">
  {dueDate&&
    <span>{format(new Date(dueDate), "EEEE MM/dd/yyyy")}</span>
  }
    <h3>{proj}</h3>
  </div>
  <h4>
    <span>test : </span>
    {test}
  </h4>
  <h4>
    <span>methode : </span>
    {monograph}
  </h4>
  <h4>
    <span>comments: </span> {comments}
  </h4>
  <div className="supervisor-card-workers">
  <span>workers : </span>
  {workers.length > 0 &&
  workers.sort().map((workersObj, index) => (
      <Fragment key={index}>
      <h4>{workersObj.workerName}</h4>
      </Fragment>
  ))}
</div>
<fieldset className="supervisor-check-status">
<legend>Project Status</legend>
<form>
<div className="form-check">
<label>
<input
type="checkbox"
id='done' 
name="status-done"
onChange={(e)=>{handleStatus(e)}}
checked={status.done}
/>
DONE
</label>
<label>
<input
type="checkbox"
id="issue"
name="status-issue"
onChange={(e)=>{handleStatus(e)}}
checked={status.issue}
/>
ISSUE
</label>
</div>
</form>
</fieldset>
  </div>
);
};

export default WorkersSupervisorOneAssignment;