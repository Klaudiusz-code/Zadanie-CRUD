const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const YAML = require('yamljs')
const User = require('./db/user');

swaggerDocs = YAML.load('./docs/swagger.yaml')


const spec = swaggerJsDoc({
    swaggerDefinition: swaggerDocs,
    apis: ['./index.js', './user.js'],
});


const app = express();


app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(spec))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/api_users', { useNewUrlParser: true });

function sendResponse(res, status, message) {
    res.status(status).json({ message });
}


function sendError(res, error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}

// Routes

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, users);
    } catch (error) {
        sendError(res, error);
    }
});

 app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        user ? sendResponse(res, 200, user) : sendResponse(res, 404, 'User not found');
    } catch (error) {
        sendError(res, error);
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        sendResponse(res, 200, { message: 'Added User', user });
    } catch (error) {
        sendError(res, error);
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        user ? sendResponse(res, 200, { message: 'User updated', user }) : sendResponse(res, 404, `Cannot find user with id: ${id}`);
    } catch (error) {
        sendError(res, error);
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.deleteOne({ _id: id });
        result.deletedCount ? sendResponse(res, 200, { message: 'User deleted' }) : sendResponse(res, 404, `Cannot find user with id: ${id}`);
    } catch (error) {
        sendError(res, error);
    }
});

app.listen(3000);
