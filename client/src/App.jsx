

import { useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')

  function addStudent(event) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !course) {
      alert('Please fill in all fields.')
      return
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      course,
    }

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ])

    setName('')
    setEmail('')
    setCourse('')
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <h1>Student Management System</h1>
          <p>Manage students and their courses in one place.</p>
        </div>
      </header>

      <section className="summary-card">
        <h2>Total Students</h2>
        <p className="student-count">{students.length}</p>
      </section>

      <section className="student-form-section">
        <h2>Add New Student</h2>

        <form onSubmit={addStudent} className="student-form">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="">Select a course</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="React Development">React Development</option>
            <option value="Node.js">Node.js</option>
            <option value="JavaScript">JavaScript</option>
          </select>

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="student-list-section">
        <h2>Student List</h2>

        {students.length === 0 ? (
          <p className="empty-message">
            No students added yet. Use the form above to add your first student.
          </p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
