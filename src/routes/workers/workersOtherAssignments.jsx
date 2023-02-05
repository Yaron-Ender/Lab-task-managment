import { useEffect, useRef, useState, Fragment } from "react";
import { useDocument } from "../../hooks/useDocument";
import { format } from "date-fns";
const WorkersOtherAssignments = ({ assignmentID, profession, docNum }) => {
  const { document } = useDocument("assignments", assignmentID);
  const [, setRerender] = useState("");
  const [restrictUseEffectIteration, setRestrictUseEffectIteration] =
    useState(0);
  const otherAssignmentObj = useRef({
    projectName: "",
    profession,
    test: [],
    userName: [],
    duedate: "",
    monograph: "",
    supervisor: "",
  }).current;
  useEffect(() => {
  if (document&&restrictUseEffectIteration<=docNum) {
  for (let i = 0; i <= docNum; i++) {
  setRestrictUseEffectIteration((prev) => ++prev);
}
    otherAssignmentObj.projectName = Object.keys(document);
  Object.values(Object.values(document)).forEach((monographesObj) => {
    Object.entries(monographesObj).forEach((monoPlusTechArr) => {
  //check if there a value in the monograph property
 if (monoPlusTechArr[1]) {
  otherAssignmentObj.monograph = monoPlusTechArr[0];
  Object.entries(monoPlusTechArr[1]).forEach((techAndTestArr) => {
    if (techAndTestArr[0] !== profession) {
    Object.entries(techAndTestArr[1]).forEach((testAdnDetArr) => {
      otherAssignmentObj.test = [
        ...otherAssignmentObj.test,
        testAdnDetArr[0],
      ];
      otherAssignmentObj.duedate = testAdnDetArr[1].dueDate;
      otherAssignmentObj.comments = testAdnDetArr[1].comments;
      otherAssignmentObj.supervisor =
        testAdnDetArr[1].supervisor["name"];
      otherAssignmentObj.userName = [
        ...otherAssignmentObj.userName,
        { [testAdnDetArr[0]]: testAdnDetArr[1]["workers"] },
      ];
      setRerender(testAdnDetArr[0]);
      });
          }
        });
      }
      });
      });
    }
  }, [document, profession, otherAssignmentObj,docNum,restrictUseEffectIteration]);
  return (
    <>
      {otherAssignmentObj.test.length > 0 &&
        otherAssignmentObj.test.map((test, index) => (
          <div key={index} className="workers-other-tech-singel-test-card">
            {otherAssignmentObj.duedate && (
              <h4>
                {" "}
                {format(
                  new Date(otherAssignmentObj.duedate),
                  "EEEE - MM/dd/yyyy"
                )}{" "}
              </h4>
            )}
            {otherAssignmentObj.projectName && (
              <div className="other-tech-Assignments-proj-test-box">
                <h4>{otherAssignmentObj.projectName}</h4>
                <h4>{test}</h4>
              </div>
            )}
            <h4>
              <span>methode : </span> {otherAssignmentObj.monograph}{" "}
            </h4>
            <h4>
              <span>comments : </span>
              {otherAssignmentObj.comments}
            </h4>
            {otherAssignmentObj.userName.map((testAndWorkerObj, index) => (
              <Fragment key={index}>
                {testAndWorkerObj[test] &&
                  testAndWorkerObj[test].map((nameObj, index) => (
                    <h4 key={index}>
                      <span>worker : </span>
                      {nameObj.workerName}
                    </h4>
                  ))}
              </Fragment>
            ))}
          </div>
        ))}
    </>
  );
};

export default WorkersOtherAssignments;
