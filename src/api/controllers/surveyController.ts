import { Request, Response } from 'express';
import { Survey } from '../models/Survey';

export const surveyController = {
  // Get all surveys
  async getAllSurveys(_: any, res: Response) {
    try {
      const surveys = await Survey.find();
      res.json(surveys);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching surveys', error });
    }
  },

  // Get single survey by ID
  async getSurveyById(req: Request, res: Response) {
    try {
      const survey = await Survey.findById(req.params.id);
      if (!survey) {
        return res.status(404).json({ message: 'Survey not found' });
      }
      res.json(survey);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching survey', error });
    }
  },

  // Create new survey
  async createSurvey(req: Request, res: Response) {
    try {
      const surveyData = req.body;
      const survey = new Survey(surveyData);
      const savedSurvey = await survey.save();
      res.status(201).json(savedSurvey);
    } catch (error) {
      res.status(400).json({ message: 'Error creating survey', error });
    }
  },
}; 