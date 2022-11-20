export const validSurvey = {
    surveyId: '123412341234123412341234',
    userId: '123456123456123456123456',
    content: [
        {
            questionId: '111111111111111111111111',
            answers: ['123456781234567812345678','63510acd07d3e2e85fd642e1'],
        }
    ]
};

export const validSurveyId = '123412341234123412341abc';
export const validUserId = '123456123456123456123abc';
export const validContent1 = [
    {
        questionId: '111111111111111111111abc',
        answers: ['123456781234567812345abc', '63510acd07d3e2e85fd642e1'],
    },
  ];


  export const validContent2 = [
    {
      questionId: '11111111111111111111abcd',
      answers: [
        {
          answer: '12345678123456781234abcd',
        },
      ],
    },
  ];

export const invalidSurveyId = '635139dd307506b573d447b';
export const invalidUserId = '635139dd307506b573d447b';
export const invalidContent = [
    {
        questionId: '11111111111111111111abcd',
      answers: [
        {
          answer: '12345678123456781234abc    ',
        },
      ],
    },
];