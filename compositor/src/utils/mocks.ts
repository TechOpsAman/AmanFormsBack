import { QuestionType } from '../compositor/interfaces/interfaces';

export const testsValues = {
  questionsValues: {
    validSurveyName1: 'survey123',
    validCreatorId: '123456123456123456123456',
    validContent1: [
      {
        questionName: 'is uri a dolphin?',
        questionType: QuestionType.select,
        answers: [
          {
            answer: 'yes',
          },
          {
            answer: 'only half',
          },
        ],
      },
    ],
    invalidSurveyId: '634e8da10c68790b062e0cf2',
  },
  answersValues: {
    validSurvey: {
      surveyId: '123412341234123412341234',
      userId: '123456123456123456123456',
      content: [
        {
          questionId: '111111111111111111111111',
          answers: ['123456781234567812345678', '63510acd07d3e2e85fd642e1'],
        },
      ],
    },
    validSurveyId: '123412341234123412341234',
    invalidSurveyId: '635139dd307506b573d447b',
  },
};
