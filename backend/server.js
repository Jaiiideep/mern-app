const cors = require('cors');
const db = require('./models');
const Role = db.role;
const express = require('express');
const productsRouter = require('./routes/products');
const database_secret = require('./config/db.config');

// Environment variables
require('dotenv').config();

// Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = database_secret;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Preparing a connection
db.mongoose.connect(uri, options)
    .then(() => {
        initial();
        console.log('Connected to mongodb via mongoose');
    })
    .catch(err => console.log('error', err));

// First connection creates roles
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({ name: "user" })
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'user' to roles collection");
                });
            new Role({ name: "moderator" })
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'moderator' to roles collection");
                });
            new Role({ name: "admin" })
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }

                    console.log("added 'admin' to roles collection");
                });
        }
    });
};

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});