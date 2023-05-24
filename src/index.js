const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const students = require('./InitialData');
let currentId = students.length > 0 ? students.length + 1 : 1
// console.log(currentId)

app.get('/api/student', (req, res) => {
  res.json(students)
})
app.get('/api/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((student) => student.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
})
app.post('/api/student', (req, res) => {
  const { name, currentClass, division } = req.body;
  if (name && currentClass && division) {
    const newStudent = {
      id: currentId,
      name: name,
      currentClass: currentClass,
      division: division
    };
    // console.log(newStudent)
    students.push(newStudent)
    currentId++;
    res.json({ id: newStudent.id });
  } else {
    res.status(400).json({ error: 'Incomplete student details' });
  }

})
app.put('/api/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const student = students.find((st) => st.id === id)
  if (student) {
    if (name) {
      student.name = name;
      res.json({name:name})
    } else {
      res.status(400).json({ error: 'Invalid update' });
    }
  }else{
      res.status(400).json({ error: 'Invalid student ID' });
  }

})
app.delete('/api/student/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const studentIndex=students.findIndex((st)=>st.id===id);
  if (studentIndex !== -1) {
    const st=students[studentIndex]
    students.splice(studentIndex, 1);
    res.json(st);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   