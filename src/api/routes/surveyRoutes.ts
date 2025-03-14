import { Router } from 'express';
import { surveyController } from '../controllers/surveyController';
import { body } from 'express-validator';

const router = Router();

// Validation middleware
const validateSurvey = [
  body('label').notEmpty().withMessage('Label is required'),
  body('about').notEmpty().withMessage('About is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.label').notEmpty().withMessage('Question label is required'),
  body('questions.*.answers').isArray().withMessage('Answers must be an array'),
  body('questions.*.answers.*.label').notEmpty().withMessage('Answer label is required'),
  body('relations').isArray().withMessage('Relations must be an array'),
  body('relations.*.question').notEmpty().withMessage('Relation question is required'),
  body('relations.*.answer').notEmpty().withMessage('Relation answer is required')
];

// Routes
router.get('/', surveyController.getAllSurveys);
router.get('/:id', surveyController.getSurveyById);
router.post('/', validateSurvey, surveyController.createSurvey);
router.put('/:id', validateSurvey, surveyController.updateSurvey);
router.delete('/:id', surveyController.deleteSurvey);

export default router; 