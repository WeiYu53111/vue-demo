const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const statusCode = require('./constants');

app.use(cors());
app.use(bodyParser.json());

//加载用户信息
const users = JSON.parse(fs.readFileSync('users.json'));

app.post('/api/login', (req, res) => {
    
    const { name, password } = req.body;
    const user = users.find((u) => u.name === name && u.password === password);
    console.log("user:"+name + "正在登陆" )
    if (user) {
        res.status(200).json({ data: { status: statusCode.CODE_SUCCESS,message: 'Login successful!' } });
    } else {
        res.status(401).json({ data: { status: statusCode.CODE_FAILED,message: 'Invalid name or password' } });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});