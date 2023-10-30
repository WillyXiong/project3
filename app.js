// modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();


// configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://wxiong4:Godisnumber1@cluster0.ymxfsgw.mongodb.net/nbda-project3?retryWrites=true&w=majority'
app.set('view engine', 'ejs')

mongoose.connect(url)
    .then(() => {
        //start server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));


// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//setup routes
app.get('/', (req, res) => {
    res.render('index');
});

//routes to contact and about
app.use('/', mainRoutes);

app.use('/events', eventRoutes);


app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = ("internal Server Error");
    }

    res.status(err.status);
    res.render('error', { error: err });
});
