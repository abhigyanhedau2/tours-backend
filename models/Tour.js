const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        difficulty: ['easy', 'medium', 'hard']
    },
    images: {
        type: [{ type: String }],
        default: [],
    },
    dates: {
        type: [{
            type: Date,
            required: true
        }],
        default: [],
    },
    locations: {
        type: [{
            locationName: {
                type: String,
                required: true
            },
            locationLink: {
                type: String,
                required: true
            }
        }],
        default: [],
    },
    duration: {
        type: String,
        required: true
    },
    participants: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    guides: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }],
        default: [],
    },
    reviews: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        default: [],
    }
});

module.exports = mongoose.model('Tour', tourSchema);