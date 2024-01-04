const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       requied:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generated id of the note
 *         title:
 *           type: string
 *           description: The note titile
 *         content:
 *           type: string
 *           description: The note content
 *         createdAt:
 *           type: string
 *           description: The creation time of the note
 *         updatedAt:
 *           type: string
 *           description: The time at which note was last updated    
 */

const noteSchema = new Schema({
    title: String,
    content: String,
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);