import './App.css'
import { useEffect, useState } from "react"
import axios from "./services/api"

function App() {

  const [isEdit, setIsEdit] = useState(false)
  const [students, setStudents] = useState({})
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: ''
  })

  useEffect(() => {
    getStudents()
  }, [])

  async function getStudents() {
    try {
      const result = await axios.get('/students/')
      await setStudents(result.data)
    } catch (e) {
      console.log(e)
    }
  }

  async function addStudent() {
    try {
      await axios.post('/students/', {
        first_name: student.first_name,
        last_name: student.last_name,
        date_of_birth: student.date_of_birth,
        email: student.email
      })

      await toggleAddPopup()
      await getStudents()
    } catch (e) {
      console.log(e)
    }
  }

  async function editStudent(id) {
    try {
      await axios.post('/students/' + id + '/edit/', {
        first_name: student.first_name,
        last_name: student.last_name,
        date_of_birth: student.date_of_birth,
        email: student.email
      })

      await toggleAddPopup()
      await getStudents()
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteStudent(id) {
    try {
      await axios.post('/students/' + id + '/delete/')
      await getStudents()
    } catch (e) {
      console.log(e)
    }
  }

  function getHumanDate(date) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let humanDate = Date.parse(date)
    humanDate = new Date(humanDate)
    humanDate = humanDate.getFullYear() + '-' + months[humanDate.getMonth()] + '-' + humanDate.getDate()
    return humanDate
  }

  function displayStudentsTable() {
    if (students && students.length > 0) {
      return students.map(student => {
        const humanDate = getHumanDate(student.date_of_birth)
        return (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{humanDate}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => toggleEditPopup(student.id)}>Edit</button>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
        )
      })
    } else {
      return []
    }
  }

  async function toggleEditPopup(id) {
    if (id) {
      const studentToEdit = students.filter(student => {
        return student.id === id
      })

      await setStudent(studentToEdit[0])
      await setIsEdit(true)
      document.querySelector('.popup').classList.toggle('show')
    }
  }

  async function toggleAddPopup() {
    await setIsEdit(false)
    document.querySelector('.popup').classList.toggle('show')
  }

  return (
    <div className="App">
      <div className='top-bar'>
        <input name='search' placeholder='Search..' />
        <button onClick={toggleAddPopup}>Add new student</button>
      </div>
      <div className='students-table'>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Date of birth</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayStudentsTable()}
          </tbody>
        </table>
      </div>

      <div className='popup'>
        <input placeholder='first name' value={student.first_name} onChange={(e) => setStudent({...student, first_name: e.target.value})} />
        <br/>
        <input placeholder='last name' value={student.last_name} onChange={(e) => setStudent({...student, last_name: e.target.value})} />
        <br/>
        <input placeholder='date of birth yyyy-mm-dd' value={student.date_of_birth} onChange={(e) => setStudent({...student, date_of_birth: e.target.value})} />
        <br/>
        <input placeholder='email' value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})} />
        <br/>
        {
          isEdit ? <button onClick={() => editStudent(student.id)}>Edit</button> : <button onClick={addStudent}>Add</button>
        }

      </div>
    </div>
  )
}

export default App
