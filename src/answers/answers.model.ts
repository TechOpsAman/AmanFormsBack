import * as mongoose from 'mongoose';
import { ISurvey } from './answers.interface';

const sectionSchema: mongoose.Schema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      delete ret._id;
    },
  },
  versionKey: false,
  id: true,
  timestamps: { createdAt: true, updatedAt: false },
});

const answerSchema: mongoose.Schema = new mongoose.Schema({
  surveyId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  content: {
    type: [sectionSchema],
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      delete ret._id;
    },
  },
  versionKey: false,
  id: true,
  timestamps: { createdAt: true, updatedAt: false },
});

answerSchema.index({ surveyId: 1, userId: 1 });

export const AnswerModel = mongoose.model<ISurvey & mongoose.Document>('iSurvey', answerSchema);
