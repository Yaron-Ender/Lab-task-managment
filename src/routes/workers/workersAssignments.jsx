
import { useEffect,useState,useMemo } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import WorkersMyAssignment from "./workersMyAssignment";
import WorkersSameTechAssignment from "./workersSameTechAssignment";
import WorkersOtherAssignments from "./workersOtherAssignments";
import { useFriestore } from "../../hooks/useFirestore"; 
import { useCallback } from "react";
import WorkersMyAssignmentByDate from "./workersMyAssignmentByDate";
const WorkersAssignments = () => {
  const { correctAssginments } = useFriestore("users"); 
  const { arrayOfDocID } = useCollection("assignments");
  const [orderbyDate,setOrderByDate] =useState([])
  const { user } = useAuthContext();
  const { document: userDocuemnt, error: errorUser } = useDocument(
    "users",
    user.uid
  );
  const [profession, setProfession] = useState(null);
  const [myAssignments, setMyAssignments] = useState([]);
// get called in WorkersMyAssignments--> it return back the object with all project's details
  const orderByDateFunction = useCallback((myAssignmentObj) => {
  if(myAssignmentObj.test.length>0){
  myAssignmentObj.test.forEach((test)=>{
  setOrderByDate((prev)=>[...prev,{test:test[0],details:test[1],monograph:test[1].mono,projectName:myAssignmentObj.projectName}])
  })
  setOrderByDate((prev)=>(prev.sort((a,b)=>{
  return new Date(b.details.dueDate).getTime()  - new Date (a.details.dueDate).getTime()
  })))
}
}, [orderbyDate]);
  const sendTofireBase = useMemo(async()=>{
    if (userDocuemnt) {
await correctAssginments(myAssignments, userDocuemnt["id"]);
    }
  },[myAssignments])
  
  useEffect(() => {
    if (userDocuemnt) {
      //store the users's assignments array
      setMyAssignments((prev) => (prev = userDocuemnt["assignments"]));
      setMyAssignments((prev) => (prev = prev.filter((id) => arrayOfDocID.includes(id))));
      
    Object.keys(userDocuemnt["position"]).map((pos) => {
      if (userDocuemnt["position"][pos]) setProfession(pos);});
    
    }
  }, [userDocuemnt, arrayOfDocID]);
  
  if (profession !== "supervisor" && profession !== "manager") {
    return (
      <div className="workers-container">
    {errorUser && <h2>user does not exsist</h2>}
    <h1>Assignments</h1>
    <div className="workers-my-assignments">
    <h2>My Assignments</h2>
    {myAssignments.length > 0 ? (
    myAssignments.map((assignmentID, index) => (
    <WorkersMyAssignment
    key={index}
    orderByDateFunction={orderByDateFunction}
    myAssignmentID={assignmentID}
    profession={profession}
    userID={userDocuemnt.id}
    myAssignmentsLength={myAssignments.length}
    />
      ))
    ) : (
      <h3>No project has been assigned</h3>
        )}
    {myAssignments.length > 0 && orderbyDate.length>0&&
    orderbyDate.map((testItem,index)=>(
    <WorkersMyAssignmentByDate key={index} singelTest={testItem}/>
    ))
    }
  </div>
    <div className="workers-same-tech-container">
      <h2>{profession} Assignments</h2>
      <div className="workers-same-tech-tests-container">
        {arrayOfDocID.length > 0 &&
          arrayOfDocID.map((assignmentID, index) => (
      <WorkersSameTechAssignment
        key={index}
        assignmentID={assignmentID}
        profession={profession}
        userID={userDocuemnt.id}
        docNum={arrayOfDocID.length}
      />
    ))}
      </div>
    </div>
      <div className="workers-other-container">
      <h2>Other worker's Assignments</h2>
      <div className="workers-other-tests-container">
      {arrayOfDocID.length > 0 &&
        arrayOfDocID.map((assignmentID, index) => (
      <WorkersOtherAssignments
        key={index}
        assignmentID={assignmentID}
        profession={profession}
        userID={userDocuemnt.id}
        docNum={arrayOfDocID.length}
      />
        ))}
    </div>
        </div>
      </div>
    );
  }
};

export default WorkersAssignments;