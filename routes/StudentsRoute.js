import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';

const router = express.Router();
let studentsArray = students;
router.get('/', (req, res) => {
    res.json(studentsArray);
    // res.send(`My first app to create API`);
    res.end();
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const singleStudent = _.find(studentsArray, student => student.id === id);
    if (singleStudent) {
        res.json(singleStudent);
        console.log(singleStudent);
    } else {
        res.send(`Request id:${id} not available`);
        console.log(`Request id:${id} not available`);
    }
    
    // res.end();
})

router.post('/', (req, res) => {
    console.log('POST method');
    studentsArray.push(req.body);
    res.status(200).send('OK');
    console.log(req.body);
    res.end();
})

router.put('/', (req, res) => {
    console.log('PUT method');
    res.end();
})

router.delete('/', (req, res) => {
    console.log('DELETE method');
    res.end();
})

router.param('id', (req, res, next, id) => {
    if(isNaN(id)) {
        next(`${id} is not a valid number`)
    }
    next();
})

module.exports = router;