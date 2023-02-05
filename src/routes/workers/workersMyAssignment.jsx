import { useEffect,useState,useRef } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersMyAssignment = ({myAssignmentID,profession,userID,myAssignmentsLength,orderByDateFunction }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [,setRerender]=useState('');
const [restricUseEffectIteration,setRestrictUseEffectIteration]=useState(1)
const myAssignmentObj = useRef({projectName:'',profession,test:[],monograph:''}).current
useEffect(()=>{
if(document&&restricUseEffectIteration<=myAssignmentsLength){
for(let i=0;i<=myAssignmentsLength;i++){
  setRestrictUseEffectIteration((prev)=>++prev)
}
myAssignmentObj.projectName = Object.keys(document)[0]
Object.values(Object.values(document)).forEach((monographesObj)=>{
Object.entries(monographesObj).forEach((monoPlusTechArr)=>{
//check if there a value in the monograph property
if(monoPlusTechArr[1]){
myAssignmentObj.monograph=monoPlusTechArr[0]
//array of test's name and details of the same technilogy
Object.entries(monoPlusTechArr[1][profession]).forEach((arr)=>{
 arr[1]['workers'].forEach((worker)=>{
if(worker.workerID===userID){
  myAssignmentObj.test = [...myAssignmentObj.test,arr];
  //rerender state is for make the comp rerender
  setRerender(arr[0]);
}
})
})
orderByDateFunction(myAssignmentObj);
}
})
})
}
},[document,myAssignmentObj,myAssignmentsLength,orderByDateFunction,profession,restricUseEffectIteration,userID])
};

export default WorkersMyAssignment;