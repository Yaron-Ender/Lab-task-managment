import { useEffect,useState,useRef } from "react";
import { useDocument } from "../../hooks/useDocument";
const WorkersMyAssignment = ({myAssignmentID,profession,userID,myAssignmentsLength,orderByDateFunction }) => {
const { document } =useDocument('assignments',myAssignmentID);
const [restricUseEffectIteration,setRestrictUseEffectIteration]=useState(1)
const myAssignmentObj = useRef({projectName:'',profession,test:[],monograph:''}).current

useEffect(()=>{
if(document&&restricUseEffectIteration<=myAssignmentsLength){
for (let i = 0; i <= myAssignmentsLength; i++) {
setRestrictUseEffectIteration((prev) => ++prev);
   }
  myAssignmentObj.projectName = Object.keys(document)[0]; 
  let monographArr = Object.keys(document[Object.keys(document)]);
 monographArr.filter((mono)=>{return document[myAssignmentObj.projectName][mono]})
 .forEach((mono)=>{
  myAssignmentObj.monograph=''
  myAssignmentObj.monograph=mono;
if (document[myAssignmentObj.projectName][mono][profession]){
  let map = new Map(Object.entries(document[myAssignmentObj.projectName][mono][profession])); 
  myAssignmentObj.test = [];
  map.forEach((value, key, map)=>{
  value.workers.forEach((worker)=>{
  if(worker.workerID===userID){
  value.mono=mono
  myAssignmentObj.test = [...myAssignmentObj.test, [key, value]]; 
}
})  
});
}
orderByDateFunction(myAssignmentObj);
  })
  
}
},[document])
};

export default WorkersMyAssignment;