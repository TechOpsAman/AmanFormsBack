# answers Crud
## Table of Contents
- [Full Setup](#full-setup)
    - [Installation](#installation)
    - [Run](#run)
- [Usage](#usage)
    - [HTTP paths](#http-paths)
    - [creat a answer](#answer-id#survey-id)
    - [get answer's information of question](#answer-id#survey-id)

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
| Post   |                                                                  | create the survey answer                          |
| Get    |  find                                                            | get the survey answer's information               |

**---------------------------------------------------------------------------------------------------------------------------------**

### createSurveyQuestionAnswer
post a survey question's answers
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |
| userId       | string          | id of the user that created the survey                         |
| content      | Array<iSection> | array of the question id and theirs answers id                 |
| questionId   | string          | the id of the question                                         |
| answers      | Array<String>   | array of the answers id the user selected                      |


#### example
```typescript
{
    "surveyId": "123412341234123412341234",
    "userId": "123456123456123456123456",
    "content":  [
        {
            "questionId": "111111111111111111111111",
            "answers": ["123456781234567812345678"]
        }
    ]
}
```
**---------------------------------------------------------------------------------------------------------------------------------**
### getSurveyQuestionsAnswersInformation
get the survey question's answers
#### Paramters
| Name         | Type            | Description                                                    |
| surveyId     | string          | the id of the survey                                           |

#### example
```typescript
/find?surveyId=634e8da60c68790b062e0cfa
```
**---------------------------------------------------------------------------------------------------------------------------------**
Footer