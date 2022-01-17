const express = require('express')
const router = express.Router()
const pool = require('../bin/connection')

router.get('/', function(req, res) {
    pool.query(
        'SELECT * FROM students',
        function(err, results, fields) {
            if (err) {
                console.log(err)
            } else {
                res.json(results)
            }
        }
    )
})

router.post('/', function(req, res) {
  console.log(req.body)
  const student = req.body

  pool.query(
    'INSERT INTO students (first_name, last_name, date_of_birth, email) VALUES (?,?,?,?)',
    [student.first_name, student.last_name, student.date_of_birth, student.email],
    function(err, results, fields) {
      if (err) {
        console.log(err)
      } else {
        console.log(results)
        console.log(fields)
      }
    }
  )

  res.json({ status: 'done' })
})

router.post('/:id/delete/', (req, res) => {
    console.log(req.params.id)
    pool.query(
        'DELETE FROM students WHERE id = ?',
        [req.params.id],
        function(err, results, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(results)
                console.log(fields)
            }
        }
    )

    res.json({ status: 'done' })
})

router.post('/:id/edit', (req, res) => {
    const student = req.body
    pool.query(
        'UPDATE students SET first_name = ?, last_name = ?, date_of_birth = ?, email = ? WHERE id = ?',
        [student.first_name, student.last_name, student.date_of_birth, student.email, req.params.id],
        function(err, results, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(results)
                console.log(fields)
            }
        }
    )
})

module.exports = router
