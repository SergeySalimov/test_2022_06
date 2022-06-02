import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { makeId } from './helper/helper';
import messages from './shared/messages';

const app = express();
const PORT = 3080;
const API = '/api';
const CORS_OPTIONS = {
    origin: '*', // разрешаем запросы с любого origin, вместо * здесь может быть ОДИН origin
    optionsSuccessStatus: 200, // на preflight-запрос OPTIONS отвечать кодом ответа 200
};

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));
app.use((req, res, next) => {
    console.log(`[${PORT}] method: ${req.method}, called url=${req.originalUrl}`);
    next();
});

const todos = [];

app.get(`${API}/cards`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(todos).end();
});

app.get(`${API}/cards/:id`, (req, res) => {
    const { id } = req.params;

    if (!id) {
        let errorText = messages.errorsText.badRequest;
        console.log(errorText);
        return res.status(400).send(errorText).end();
    }

    const indexOfTodo = todos.findIndex(todo => todo.id === id);


    if (indexOfTodo < 0) {
        return res.status(204).send(null).end();
    }

    res.setHeader('Content-Type', 'application/json');

    res.status(200).send(todos[indexOfTodo]).end();
});

app.post(`${API}/cards`, (req, res) => {
    const { description, createdAt } = req.body;

    if (!description || !createdAt) {
        let errorText = messages.errorsText.badRequest;
        console.log(errorText);
        return res.status(400).send(errorText).end();
    }

    const id = makeId();

    const newTodo = { id, description, createdAt };
    todos.push(newTodo);

    res.status(200).send(todos).end();
});

app.put(`${API}/cards/:id`, (req, res) => {
    const { body, params: { id } } = req;

    if (!id || !body || !('description' in body)) {
        let errorText = messages.errorsText.badRequest;
        console.log(errorText);
        return res.status(400).send(errorText).end();
    }

    const indexOfTodo = todos.findIndex(todo => todo.id === id);

    if (indexOfTodo < 0) {
        let errorText = messages.errorsText.notFound.replaceAll('$1', 'Todos');
        console.log(errorText);
        return res.status(404).send(errorText).end();
    }

    todos[indexOfTodo] = { ...body };

    res.status(200).send(todos[indexOfTodo]).end();
});

app.delete(`${API}/cards/:id`, (req, res) => {
    const { id } = req.params;

    if (!id) {
        let errorText = messages.errorsText.badData;
        console.log(errorText);
        return res.status(400).send(errorText).end();
    }

    const indexOfTodo = todos.findIndex(todo => todo.id === id);

    if (indexOfTodo < 0) {
        let errorText = messages.errorsText.notFound.replaceAll('$1', 'Todos');
        console.log(errorText);
        return res.status(404).send(errorText).end();
    }

    todos.splice(indexOfTodo, 1);

    res.status(200).send(todos).end();
});

app.listen(PORT, () => {
    console.log(messages.startWork.replaceAll('$1', PORT.toString()));
});