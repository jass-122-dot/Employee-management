import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", role: "" });

  // Fetch all employees when page loads
  useEffect(() => {
    axios.get("http://localhost:5000/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/add-employee", form)
      .then(() => {
        setEmployees([...employees, form]);
        setForm({ name: "", role: "" });
      })
      .catch(err => console.error("Error adding employee:", err));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Employee Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Employee Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <button type="submit">Add Employee</button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {employees.map((emp, idx) => (
          <li key={idx}>{emp.name} - {emp.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

