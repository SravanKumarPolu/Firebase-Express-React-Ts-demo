import { useState, useEffect } from "react";
import "./App.css";
interface Employee {
  id: string;
  name: string;
  salary: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeSalary, setNewEmployeeSalary] = useState("");

  const API_URL = "http://localhost:5038/";
  useEffect(() => {
    refreshEmployees();
  }, []);
  const refreshEmployees = async () => {
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
        body: JSON.stringify({
          name: newEmployeeName,
          salary: newEmployeeSalary,
        }),
      });
      refreshEmployees();
      setNewEmployeeName("");
      setNewEmployeeSalary("");
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };
  const editClick = async (id: string) => {
    const newName = prompt("Enter new Name:");
    const newSalary = prompt("Enter new Salary:");
  };
  const deleteClick = async (id: string) => {
    try {
      await fetch(API_URL + `api/employee/DeleteEmployees?id=${id}`, {
        method: "DELETE",
      });
      refreshEmployees();
    } catch (error) {
      console.error("Error delete employee:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col bg-slate-500 min-h-screen  items-center px-4 py-10 gap-8">
        <h1 className="font-bold text-yellow-50 text-4xl py-10">
          Firebase-Express-React-Ts-demo
        </h1>
        <div className="flex flex-col gap-3 justify-center items-center">
          <h2 className="font-semibold text-white text-3xl py-5">
            Employees Info
          </h2>
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center text-center">
            <input
              className="w-full md:w-80 px-2 py-1 text-black rounded-sm shadow-md"
              id="newEmployeeName"
              placeholder="Name..."
              type="text"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
            />
            <input
              className="w-full md:w-80 px-2 py-1 text-black rounded-sm shadow-md"
              id="newEmployeeSalary"
              placeholder="Salary..."
              type="number"
              value={newEmployeeSalary}
              onChange={(e) => setNewEmployeeSalary(e.target.value)}
            />
            <button
              className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-sm"
              onClick={addClick}>
              + Employee Info
            </button>
          </div>

          {employees.map((employee, index) => (
            <div
              key={index}
              className="flex text-cyan-50 text-lg flex-col md:flex-row items-center justify-center text-center gap-5">
              <div className="flex flex-col md:flex-row  text-left items-center justify-center gap-5">
                <p className="w-full md:w-80">{employee.name}</p>
                <p className="w-full md:w-80">${employee.salary}/-</p>
              </div>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 shadow-sm"
                onClick={() => editClick(employee.id)}>
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 shadow-sm"
                onClick={() => deleteClick(employee.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
