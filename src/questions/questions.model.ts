/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import { QuestionType, Survey } from './questions.interface';

const answerSchema: mongoose.Schema = new mongoose.Schema({
  answer: {
    type: String,
  },
  connectedAt: {
    type: Date,
  },
}, {
  toJSON: {
    virtuals: true,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    transform(_doc, ret) {
      delete ret._id;
    },
  },
  versionKey: false,
  id: true,
});

const questionSchema: mongoose.Schema = new mongoose.Schema({
  questionName: {
    type: String,
  },
  questionType: {
    type: String,
    enum: QuestionType,
    required: true,
  },
   required: {
    type: Boolean,
    required: true,
  },
  answers: {
    type: [answerSchema], 
    required: true,
    id: true,
  },
  connectedAt: {
    type: Date,
  },
}, {
  toJSON: {
    virtuals: true,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    transform(_doc, ret) {
      delete ret._id;
    },
  },
  versionKey: false,
  id: true,
});

const surveySchema: mongoose.Schema = new mongoose.Schema({
  surveyName: {
    type: String,
    required: true,
    unique: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  content: {
    type: [questionSchema],
    required: true,
    id: true,
  },
  connectedAt: {
    type: Date,
  },
}, {
  toJSON: {
    virtuals: true,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    transform(_doc, ret) {
      delete ret._id;
    },
  },
  versionKey: false,
  id: true,
  timestamps: { createdAt: true, updatedAt: false },
});

surveySchema.index({ firstName: 1, lastName: 1 });

export const QuestionModel = mongoose.model<Survey & mongoose.Document>('Survey', surveySchema);
