import { useState, useEffect } from "react";
import "./App.css";
interface Employee {
  id: string;
  name: string;
  salary: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState("");

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
  const addClick = async () => {
    try {
      await fetch(API_URL + "api/employee/AddEmployees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmployees: newEmployee }),
      });
      refreshEmpoyees();
      setNewEmployee("");
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };
  const deleteClick = async (id) => {
    try {
      await fetch(API_URL + `api/employee/DeleteEmployees?id=${id}`, {
        method: "DELETE",
      });
      refreshEmpoyees();
    } catch (error) {
      console.error("Error delete employee:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Firebase-Express-React-Ts-demo</h1>
        <h2> Employees Info</h2>
        <div>
          <input
            id="newEmployees"
            value={newEmployee}
            onChange={(e) => setNewEmployee(e.target.value)}
          />
          <button onClick={addClick}>+ Employee Info</button>
        </div>
        {employees.map((employee, index) => (
          <p key={index}>
            <span className="flex flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-center gap-5">
              <b className=" flex gap-10 text-left h-10  w-[20rem] ">
                {employee.name}
                <span>₹{employee.salary}/-</span>
              </b>
            </span>
            <button onClick={() => deleteClick(employee.id)}>Delete</button>
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
