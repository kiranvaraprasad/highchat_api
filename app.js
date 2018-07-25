import express from 'express';
import morgan from 'morgan';
import StudentsRoute from './routes/StudentsRoute';
import students from './data/students.json';
import _ from 'lodash';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = process.env.PORT || 3000;

const basePath = (version, path) => `/api/${version}/${path}`;
const getUrl = basePath('v1', 'students')

const server = express();

server.use(morgan('tiny'));
server.use(bodyParser.json());

server.set('views', path.join('views'));
server.set('view engine', 'ejs');

server.use(getUrl, StudentsRoute);

server.get('/', (req, res) => {
    res.render('index');
})

server.get('/router-handler', (req, res, next) => {
    res.send(`Router Handler`)
    next();
}, (req, res) => {
    console.log('Second Handler')
})

server.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})