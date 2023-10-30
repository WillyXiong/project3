const model = require('../models/event')

exports.index = (req, res) => {
    model.find()
    .then(events => {
        let groupedEvents = groupByCategory(events);
        res.render('./event/index', {events, groupByCategory: groupedEvents});
    })
    .catch(err => next(err));
    
};

function groupByCategory(events) {
    const groupedEvents = {};
    events.forEach(event => {
        if (!groupedEvents[event.category]) {
            groupedEvents[event.category] = [];
        }
        groupedEvents[event.category].push(event);
    });
    return groupedEvents;
}

exports.newEvent = (req, res) => {
    res.render('./event/newEvent')
};

exports.create = (req, res, next) => {

    //create a new event document
    let event = new model(req.body);

    //check if req.file exist
    if (req.file) {
        event.image = '/images/img-upload/' + req.file.filename;

        //since save() method is an instance method. 
        //Also, this is how we insert the doc to the database
        event.save()
        .then((event) => {
            res.redirect('/events');
        })
        .catch(err => {
            if(err.name === 'ValidationError' ) {
                err.status = 400;
            }
            next(err);
        });
    } 
    else {
        // Handle the case if req.file DOES NOT exist
        let err = new Error('Event validation failed: image: Image is required, endDateTime: Ending time/date are required, startDateTime: Starting time/date are required, location: Location is required, details: Details is required, host: Host is required, category: Category is required, title: Title is required');
        err.status = 400;
        next(err);
    }
};

exports.event = (req, res, next) => {
    let id = req.params.id;

    //an objectID is a 24-bit Hex String
    //id has to follow this pattern. It can only contain 0-9, lowercase/uppercase a through f, and has to be 24 digits. 
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event => {
        // if event is not undefined
        if(event) {
            res.render('./event/event', {event});
        } 
        else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/edit', { event });
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let event = req.body
    let id = req.params.id;

    console.log(req.file);
    //if req.file exist
    if (req.file) {
        event.image = '/images/img-upload/' + req.file.filename;
    }

    if (model.updateById(id, event)) {
        res.redirect('/events/' + id);
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model, model.deleteById(id)) {
        res.redirect('/events');

    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};