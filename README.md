# react-drawing-game

This is a simple drawing game made using React meant to collect a dataset of simple human drawings.

https://github.com/user-attachments/assets/a7b76aa2-b550-4a99-9560-4dab663c1adf

Live instance at [http://85.131.172.30:39912/](http://85.131.172.30:39912/)
Go try it out yourself!

## How to run yourself
Make sure you have Docker and npm installed!<br/>
Run `npm i` in frontend and backend directories<br/>
Create a new Firebase project<br/>
Run docker-compose up -d in db.<br/>
Create a .env file in frontend and set the following environment variables: VITE_API_KEY, VITE_AUTH_DOMAIN, VITE_PROJECT_ID, VITE_STORAGE_BUCKET, VITE_APP_ID. Also set VITE_API_URL accordingly to your docker-compose configuration.<br/>
Create a .env file in backend and set MONGO_URI. This should be in the form mongodb://user:password@ip:port/game?directConnection=true&authSource=admin. Make sure to set this in relation to your docker-compose configuration.<br/>
Run node . in backend<br/>
In frontend, run `npm run dev` for testing and `npm run build` `npm run preview` for production. <br/>
