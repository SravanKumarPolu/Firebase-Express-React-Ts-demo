import { useState, useEffect } from "react";
import "./App.css";
interface Employee {
  id: string;
  name: string;
  salary: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const API_URL = "http://localhost:5038/";
  useEffect(() => {
    refreshEmpoyees();
  }, []);
  const refreshEmpoyees = async () => {
    try {
      const response = await fetch(API_URL + "api/employee/getinfo");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Firebase-Express-React-Ts-demo</h1>
        <h2> Employees Info</h2>
        {employees.map((employee, index) => (
          <p key={index}>
            <span className="flex flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-center gap-5">
              <b className=" flex gap-10 text-left h-10  w-[20rem] ">
                {employee.name}
                <span>₹{employee.salary}/-</span>
              </b>
            </span>
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
