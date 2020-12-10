## Shop on MERN stack (Mongo, Express, React, Node)

Need to install local; ` Node 12+ version, MongoDB`.

### Install Dependencies (frontend & backend)

```
npm install
cd client
npm install
```

### Env Variables

Create a .env file in then root and add the following

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
