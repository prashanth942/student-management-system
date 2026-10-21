
import { useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim()

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText)
    )
  })

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !course) {
      alert('Please fill in all fields.')
      return
    }

    if (editingId !== null) {
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === editingId
            ? { ...student, name: name.trim(), email: email.trim(), course }
            : student
        )
      )
      setEditingId(null)
    } else {
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
    }

    setName('')
    setEmail('')
    setCourse('')
  }

  function editStudent(student) {
    setName(student.name)
    setEmail(student.email)
    setCourse(student.course)
    setEditingId(student.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteStudent(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (confirmed) {
      setStudents((previousStudents) =>
        previousStudents.filter((student) => student.id !== id)
      )

      if (editingId === id) {
        cancelEdit()
      }
    }
  }

  function cancelEdit() {
    setEditingId(null)
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
        <h2>{editingId !== null ? 'Edit Student' : 'Add New Student'}</h2>

        <form onSubmit={handleSubmit} className="student-form">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            required
          >
            <option value="">Select a course</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="React Development">React Development</option>
            <option value="Node.js">Node.js</option>
            <option value="JavaScript">JavaScript</option>
          </select>

          <button type="submit">
            {editingId !== null ? 'Update Student' : 'Add Student'}
          </button>

          {editingId !== null && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="student-list-section">
        <h2>Student List</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search students by name or email"
          />
        </div>

        {filteredStudents.length === 0 ? (
          <p className="empty-message">
            {students.length === 0
              ? 'No students added yet. Use the form above to add your first student.'
              : 'No students match your search.'}
          </p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>
                      {' '}
                      <button
                        type="button"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
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
