# questions Crud
## Table of Contents
- [Full Setup](#full-setup)
    - [Installation](#installation)
    - [Run](#run)
- [Usage](#usage)
    - [HTTP paths](#http-paths)
    - [get a question](#question-id#survey-id)
    - [delete a question](#question-id#survey-id)
    - [update a question](#question-id#survey-id)
    - [create-survey](#survey)
    - [get-survey](#survey-id)
    - [update-survey](#survey-id#new-content)
    - [delete-survey](#survey-id)

## Full Setup
### Installation

```bash
git clone https://github.com/danivngopro/Forms.git

cd forms/questions

npm install
```

### Run 

```bash
docker-compose up --build -d
```

## Usage
#### HTTP paths 

| METHOD | ENDPOINT                                                         | DESCRIPTION                                       |
| ------ | :----------------------------------------------------------------| :----------------------------------------------   |
| Post   |  createSurvey                                                    | create a survey                                   |
| Put    |  updateSurvey                                                    | update a survey                                   |
| Put    |  updateQuestion                                                  | update a question                                 |
| Get    |  getSurveyById                                                       | get a survey by survey id                         |
| Get    |  getQuestion                                                     | get question by question id                       |
| delete |  deleteSurveyById                                                    | delete survey by survey id                        |
| delete |  deleteQuestion                                                  | get question by question id                       |

**---------------------------------------------------------------------------------------------------------------------------------**

### createSurvey
post a survey
#### Paramters
| Name         | Type            | Description                                                    |
| surveyName   | string          | the name of the survey                                         |
| creatorId    | string          | id of the creator of the survey                                |
| content      | Array<Question> | array of all the questions and possible answers in the survey  |
| questionName | string          | the name of the question                                       |
| questionType | enum            | the type of the question                                       |
| answers      | string          | possible answer to a specific question                         |


#### example
```typescript
{
    "surveyName": "are you ok",
    "content": [
        {
            "questionName": "who are you doing",
            "questionType": "select",
            "answers": [
                {
                    "answer": "good"
                }
            ]
        }
    ]
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### updateSurvey
update a survey
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |
| surveyName   | string          | new name for the survey                                        |
| content      | Array<Question> | array of all the questions and possible answers in the survey  |
| questionName | string          | the name of the question                                       |
| questionType | enum            | the type of the question                                       |
| answers      | string          | possible answer to a specific question                         |

#### example
```typescript
{
    "surveyId": "634e8da60c68790b062e0cfa",
    "surveyName": "are you ok updated 13243244",
    "content": [
        {
            "questionName": "whats your favorite proccessor?",
            "questionType": "radio",
            "answers": [
                {
                    "answer": "ryzen 9"
                },
                {
                    "answer": "i9"
                },
                {
                    "answer": "i3"
                },
                {
                    "answer": "none of the above"
                }
            ]
        }
    ]
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### updateQuestion
update a question
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |
| questionId   | string          | id of the question                                             |
| content      | Array<Question> | array of all the questions and possible answers in the survey  |
| questionName | string          | the name of the question                                       |
| questionType | enum            | the type of the question                                       |
| answers      | string          | possible answer to a specific question                         |

#### example
```typescript
/updateQuestion?surveyId=634e8da60c68790b062e0cfa&questionId=634e91ace51401496e873714
{
    "content": [
        {
            "questionName": "daniel was here",
            "questionType": "radio",
            "answers": [
                {
                    "answer": "ydfdfdfdfes ofcourse he is11"
                },
                {
                    "answer": "nodfdfdfdf he i"
                }
            ]
        }
    ]
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### getSurveyById
get a survey
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |

#### example
```typescript
{
    "surveyId": "634e8da60c68790b062e0cfa",
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### getQuestion
get a question
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |
| questionId   | string          | the id of the question                                         |

#### example
```typescript
{
    "surveyId": "634e8da60c68790b062e0cfa",
    "questionId": "634e8da60c68790b062e0cfb"
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### deleteSurveyById
delete a survey
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |

#### example
```typescript
{
    "surveyId": "634e8da60c68790b062e0cfa",
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### deleteQuestion
delete a question
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |
| questionId   | string          | the id of the question                                         |

#### example
```typescript
{
    "surveyId": "634e8da60c68790b062e0cfa",
    "questionId": "634e8da60c68790b062e0cfb"
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
