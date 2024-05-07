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
        body: JSON.stringify({
          salary: newEmployeeSalary,
          name: newEmployeeName,
        }),
      });
      refreshEmpoyees();
      setNewEmployeeName("");
      setNewEmployeeSalary("");
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };

  const deleteClick = async (id: string) => {
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
      <div
        className=" flex flex-col gap-4  bg-slate-500 min-h-screen 
      pt-10 md:pt-20 lg:pt-32 xl:pt-40">
        <h1 className=" font-bold text-yellow-50 text-4xl ">
          Firebase-Express-React-Ts-demo
        </h1>
        <div className=" flex flex-col gap-3 justify-center align-middle items-center ">
          <h2 className="font-semibold text-white text-3xl ">
            {" "}
            Employees Info
          </h2>
          <div className="flex gap-3">
            <div className="flex flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-center gap-5">
              <div className="flex flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-center gap-5">
                <input
                  className=" w-[20rem] text-black xs:w-full px-2 sm:w-full md:w-[20rem]
                   h-[2.5rem] rounded-sm shadow-md"
                  id="newEmployeeName"
                  placeholder="Name..."
                  type="value"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                />
                <input
                  className=" w-[20rem] text-black xs:w-full px-2 sm:w-full md:w-[20rem]
                    h-[2.5rem] rounded-sm shadow-md"
                  id="newEmployeeSalary"
                  placeholder="Salary..."
                  type="number"
                  value={newEmployeeSalary}
                  onChange={(e) => setNewEmployeeSalary(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 w-[10rem] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-sm"
                onClick={addClick}>
                + Employee Info
              </button>
            </div>
          </div>
          <div className=" flex w-full flex-col gap-4 justify-center items-center">
            {employees.map((employee, index) => (
              <p key={index}>
                <span className="flex text-cyan-50 text-lg flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-center gap-5">
                  <b className="flex flex-col xs:flex-col md:flex-row px-10 items-center justify-center text-left gap-5">
                    <span
                      className=" w-[20rem]  xs:w-full px-2 sm:w-full md:w-[20rem]
                      h-[2.5rem] ">
                      {employee.name}
                    </span>

                    <span
                      key={index}
                      className=" w-[20rem]  xs:w-full px-2 sm:w-full md:w-[20rem]
                     h-[2.5rem] ">
                      ₹{employee.salary}/-
                    </span>
                  </b>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600  shadow-sm"
                    onClick={() => deleteClick(employee.id)}>
                    Delete
                  </button>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
