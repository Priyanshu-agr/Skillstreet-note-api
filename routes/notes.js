const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notes');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: The notes managing api
 */


/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Returns the list of all the notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: The list of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Some server error
 */

router.route('/')
    .get(noteController.retrieveNote);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                  type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The note was successfully created
 *         content:
 *           application/json:
 *             schmeas:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Some server error
 */

router.route('/')
    .post(noteController.validate('newNote'), noteController.newNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note by the id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                  type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The note was updated
 *         
 *       500:
 *         description: Some error happened     
 */

router.route('/:id')
    .put(noteController.validate('updateNote'), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by its id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: The note was deleted successfully
 *       500:
 *         description: Some error happened
 */

router.route('/:id')
    .delete(noteController.deleteNote);

module.exports = router;