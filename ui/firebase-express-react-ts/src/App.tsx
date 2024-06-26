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

  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editEmployeeSalary, setEditEmployeeSalary] = useState("");

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

  const editClick = (employee: Employee) => {
    setEditEmployeeId(employee.id);
    setEditEmployeeName(employee.name);
    setEditEmployeeSalary(employee.salary.toString());
  };

  const updateEmployee = async () => {
    try {
      await fetch(
        API_URL + `api/employee/UpdateEmployees?id=${editEmployeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editEmployeeName,
            salary: editEmployeeSalary,
          }),
        }
      );
      refreshEmployees();
      setEditEmployeeId(null);
      setEditEmployeeName("");
      setEditEmployeeSalary("");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteClick = async (id: string) => {
    try {
      await fetch(API_URL + `api/employee/DeleteEmployees?id=${id}`, {
        method: "DELETE",
      });
      refreshEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-500 min-h-screen items-center px-4 py-10 gap-8 overflow-auto">
      <h1 className="font-bold text-yellow-50 text-4xl py-10 text-center">
        Firebase-Express-React-Ts-demo
      </h1>
      <div className="flex flex-col gap-3 justify-center items-center w-full">
        <h2 className="font-semibold text-white text-3xl py-5 text-center">
          Employees Info
        </h2>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center text-center w-full">
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-sm"
            onClick={addClick}>
            + Employee Info
          </button>
        </div>

        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex text-cyan-50 text-lg flex-col md:flex-row items-center justify-center text-center gap-5 w-full">
            {editEmployeeId === employee.id ? (
              <>
                <input
                  className="w-full md:w-80 px-2 py-1 text-black rounded-sm shadow-md"
                  id="editEmployeeName"
                  placeholder="Name..."
                  type="text"
                  value={editEmployeeName}
                  onChange={(e) => setEditEmployeeName(e.target.value)}
                />
                <input
                  className="w-full md:w-80 px-2 py-1 text-black rounded-sm shadow-md"
                  id="editEmployeeSalary"
                  placeholder="Salary..."
                  type="number"
                  value={editEmployeeSalary}
                  onChange={(e) => setEditEmployeeSalary(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 shadow-sm"
                  onClick={updateEmployee}>
                  Update Employee Info
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col md:flex-row text-left items-center justify-center gap-5 w-full md:w-auto">
                  <p className="w-full md:w-80">{employee.name}</p>
                  <p className="w-full md:w-80">${employee.salary}/-</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 shadow-sm"
                    onClick={() => editClick(employee)}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 shadow-sm"
                    onClick={() => deleteClick(employee.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
