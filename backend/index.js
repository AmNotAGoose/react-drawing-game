//chatgpt used to help with registering a new user in own database (not firebase)
const express = require('express');
const db = require('./db/connection.js');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./react-drawing-679de-firebase-adminsdk-ru2o4-ae9598f0bb.json");
const Drawing = require('./models/Drawing.js');
const Prompt = require('./models/Prompt.js');
const timestamp = require('unix-timestamp');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User.js');

// firebase auth
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;

        let user = await User.findOne({ uid: decodedToken.uid });

        if (!user) {
            user = new User({
                uid: decodedToken.uid,
                name: decodedToken.name,
                points: 0, 
                uuid: uuidv4(), 
            });
            await user.save();
        }
        req.userRecord = user;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
 
//express

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/protected', verifyToken);

app.get('/api', (req, res) => {
    res.send('hey there');
});

app.get('/api/protected/user/points', async (req, res) => {
    const { uid } = req.query;

    if (!uid ) {
        return res.status(400).json({ error: 'some field is missing' });
    }

    try {
        const results = await User.findOne({uid: uid});
        res.json(results.points);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/protected/leaderboard', async (req, res) => {
    const { uid } = req.body;

    if (!uid ) {
        return res.status(400).json({ error: 'some field is missing' });
    }

    try {
        const results = await Prompt.findOne({uid: uid});
        res.json(results.points);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/protected/prompt', async (req, res) => {
    try {
        const results = await Prompt.find({});
        res.json(results[Math.floor(Math.random() * results.length)]);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/protected/submit', async (req, res) => {
    const { user, drawing, prompt } = req.body;

    if (!user || !drawing || !prompt) {
        return res.status(400).json({ error: 'some field is missing' });
    }

    const t = timestamp.now();
    const u = uuidv4();
    const newDrawing = new Drawing({
        user,
        drawing,
        prompt,
        timestamp: t,
        uuid: u,
    });

    try {
        const savedDrawing = await newDrawing.save();
        const oldUser = await User.findOne({ uid: user });
        await User.findOneAndUpdate(
            {uid: user},
            {points: oldUser.points + 1},
        )
        res.status(201).json({ message: 'Drawing saved! Points added!', data: savedDrawing });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// init servers

const APP_PORT = 33993;

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});