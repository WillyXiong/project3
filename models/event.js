//require mongoose so we can use it in this file
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    category: {type: String, required: [true, 'Category is required'], enum: ['Food Truck', 'Activities', 'Meat and Greet', 'Competitions', 'Miscellaneous']},
    hostName: {type: String, required: [true, 'Host is required']},
    details: {type: String, required: [true, 'Details is required'],
    minLength: [10, 'Details should have at least 10 characters']},
    location: {type: String, required: [true, 'Location is required']},
    startDateTime: {type: Date, required: [true, 'Starting time/date are required']},
    endDateTime: {type: Date, required: [true, 'Ending time/date are required']},
    image: { type: String, required: [true, 'Image is required']}
});

//collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);