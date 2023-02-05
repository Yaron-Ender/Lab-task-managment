import { useState,useEffect } from "react";
import FormInput from "../../component/input/input.comp";
import Button from "../../component/button/button";
import { workersID } from "../../asstes/workers-ID-Numbers"; 
import { useSignup } from "../../hooks/useSignup";
import { useISManager } from "../../hooks/useIsManager";
const Signup = () => {
  const { error,isPending,signup } = useSignup()
  const { manager,position } = useISManager()
  const defaultInput = {
    userName: "",
    email:'',
    employeeNumber: "",
    password: "",
    confirmPassword: "",
  };
  const [inputFields, setInputFields] = useState(defaultInput);
  const [employeeNum,setEmployeeNum] =useState(null);
  const [comparePS,setComparePS] = useState(false)
  const { userName,email, employeeNumber,password, confirmPassword } = inputFields;
  useEffect(() => {
    setComparePS(false);
    if (password === confirmPassword) {
      setComparePS(true);
    }
    //find user position
    if (employeeNumber.length === 6) {
      setEmployeeNum(
        (prev) => (prev = workersID.find((num) => num == employeeNumber))
      );
      manager(employeeNum);
    }
  }, [password, confirmPassword, employeeNumber, position, employeeNum,manager]);

//update the inputField state
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit =async(e)=>{
    e.preventDefault();
    if (comparePS && employeeNum) {
      await signup(email,password,userName,employeeNum,position);
      setComparePS(false)
      setEmployeeNum(null)
      setInputFields(defaultInput);
    } else {
      console.log("form could not submitted");
    }
  };
  return (
    <div className="signup-container">
      <h2>Sinup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <FormInput
          id="User Name"
          label="User Name"
          type="text"
          name="userName"
          value={userName}
          onChange={handleInput}
          required
        />
        <FormInput
          id="email"
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={handleInput}
          required
        />
        <FormInput
          id="Employee Number"
          label="Employee Number"
          type="number"
          name="employeeNumber"
          value={employeeNumber}
          onChange={handleInput}
          required
        />
        <FormInput
          id="password"
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
          required
        />
        <FormInput
          id="confirm password"
          label="confirm password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInput}
          required
        />
        {!isPending && <Button children={"Signup"} buttontype="login" />}
        {isPending && (
          <Button
            disabled={"disabled"}
            children={"loading..."}
            buttontype="login"
          />
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
