import { format } from "date-fns";
import { useState,useEffect }from 'react'
const WorkersMyAssignmentByDate = ({ singelTest }) => {
  const { test, monograph, projectName } = singelTest;
  const { comments, dueDate, supervisor } = singelTest.details;

const [today,setToday] =useState('')

useEffect(()=>{
setToday(format(new Date(),"dd/MM/yyyy"));
},[singelTest])
return(
<div className={`workers-singel-test-container ${today&&dueDate&& (today===format(new Date(dueDate),"dd/MM/yyyy"))?'today':''}`}>
<div className="workers-singel-test-card">
{dueDate&&
  <h4>{format(new Date(dueDate),'EEEE dd/MM/yyyy')}</h4>
} 
<div className="myAssignments-proj-test-box">
{projectName&&<h4>{projectName}</h4>}
<h4>{test}</h4>
</div>
<h4><span>methode : </span>{monograph}</h4>
{(comments)?<h4><span>comments : </span>{comments}</h4>:<span>no comments</span>}
{(supervisor.name)?<h4> <span>supervisor : </span>{supervisor.name}</h4>:<span>no supervisor has been set yet</span>}
</div>  
</div>
  )
};

export default WorkersMyAssignmentByDate;