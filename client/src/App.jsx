
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'https://student-management-system-0909.onrender.com/api/students'

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [course, setCourse] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error))
  }, [])

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim()
    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText)
    )
  })

  async function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !age || !course) {
      alert('Please fill in all fields.')
      return
    }

    const studentData = {
      name: name.trim(),
      email: email.trim(),
      age: Number(age),
      course,
    }

    try {
      if (editingId !== null) {
        const response = await axios.put(
          `${API_URL}/${editingId}`,
          studentData
        )

        setStudents((previousStudents) =>
          previousStudents.map((student) =>
            student._id === editingId ? response.data : student
          )
        )

        setEditingId(null)
        alert('Student updated successfully!')
      } else {
        const response = await axios.post(API_URL, studentData)

        setStudents((previousStudents) => [
          ...previousStudents,
          response.data,
        ])

        alert('Student added successfully!')
      }

      setName('')
      setEmail('')
      setAge('')
      setCourse('')
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  function editStudent(student) {
    setName(student.name)
    setEmail(student.email)
    setAge(String(student.age))
    setCourse(student.course)
    setEditingId(student._id)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteStudent(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirmed) return

    try {
      await axios.delete(`${API_URL}/${id}`)

      setStudents((previousStudents) =>
        previousStudents.filter((student) => student._id !== id)
      )

      if (editingId === id) {
        cancelEdit()
      }

      alert('Student deleted successfully!')
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting student')
    }
  }

  function cancelEdit() {
    setEditingId(null)
    setName('')
    setEmail('')
    setAge('')
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
            placeholder="Enter student email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter student age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
            min="1"
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
                  <th>Age</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>
                      <button type="button" onClick={() => editStudent(student)}>
                        Edit
                      </button>
                      {' '}
                      <button type="button" onClick={() => deleteStudent(student._id)}>
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
