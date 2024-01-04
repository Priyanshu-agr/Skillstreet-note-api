const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const noteRoutes = require('./routes/notes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT)
    .then(console.log('Database conntected')
    )

mongoose.connection.on('error', err => {
    console.log(err);
})

const options = {
    definition: {
        openapi: "3.0.2",
        info: {
            title: "Notes API",
            version: "1.0.0",
            description: "Simple Note-Taking API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./models/*.js", "./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.listen(PORT, (req, res) => {
    console.log(`The server is running on port ${PORT}`);
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/notes', noteRoutes);


