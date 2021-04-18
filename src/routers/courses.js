const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseControllers');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-stored-form-actions', courseController.handleStoredFormActions);
router.post('/handle-trash-form-actions', courseController.handleTrashFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
