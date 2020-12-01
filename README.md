## Shop on MERN stack (Mongo, Express, React, Node)

After cloning repo need execute command `npm install` in main folder and `client` folder.

Next, need create .env file
```
NODE_ENV = mode ('development' or 'production')
# Don't forget change port in client/package.json
# for scripts to work
PORT = portNumber (5000)
MONGO_URI = connect to mongoDB
JWT_SECRET= put your secret key
```

for seeding data to MongoDB:
`npm run data:import`

for start API and FRONT after clone:
`npm run dev`
