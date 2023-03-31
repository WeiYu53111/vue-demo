const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const { name, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json'));

    const user = users.find((u) => u.name === name && u.password === password);

    if (user) {
        res.status(200).json({ status: 'success', data: { message: 'Login successful!' } });
    } else {
        res.status(401).json({ status: 'error', data: { message: 'Invalid name or password' } });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});