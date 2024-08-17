const express = require('express');
const db = require('./db/connection.js');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./react-drawing-679de-firebase-adminsdk-ru2o4-ae9598f0bb.json");
const Drawing = require('./models/Drawing.js');
const Prompt = require('./models/Prompt.js');

// firebase auth
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
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

app.get('/api/protected/prompt', async (req, res) => {
    try {
        const results = await Prompt.find({}); //later choose a random one
        res.json(results);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/protected/submit', async (req, res) => {
    const { user, drawing, timestamp, uuid } = req.body;

    if (!user || !drawing || !timestamp || !uuid) {
        return res.status(400).json({ error: 'some field is missing' });
    }

    const newDrawing = new Drawing({
        user,
        drawing,
        timestamp,
        uuid,
    });

    try {
        const savedDrawing = await newDrawing.save();
        res.status(201).json({ message: 'Drawing saved!', data: savedDrawing });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// init servers

const APP_PORT = process.env.PORT || 33993;

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});