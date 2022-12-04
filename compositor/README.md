# compositor

## Table of Contents

- [Full Setup](#full-setup)
  - [Installation](#installation)
  - [Run](#run)
- [Usage](#usage)
  - [HTTP paths](#http-paths)
  - [delete a survey questions and answers](#survey-id)
  - [get survey questions and answers](#survey-id)

## Full Setup

### Installation

```bash
git clone https://github.com/danivngopro/Forms.git

cd forms/compositor

npm install
```

### Run

```bash
docker-compose up --build -d
```

## Usage

#### HTTP paths

| METHOD | ENDPOINT         | DESCRIPTION                                      |
| ------ | :--------------- | :----------------------------------------------- |
| Get    | getSurveyResults | get survey questions and answers by survey id    |
| Delete | deleteSurvey     | delete survey questions and answers by survey id |

**----------------------------------------------------------------------------------------------------------------------------------------------**

### getSurveyResults

get survey questions and answers

#### Paramters

| Name     | Type   | Description          |
| -------- | :----- | :------------------- |
| surveyId | string | the id of the survey |

#### example

```typescript
{
    "surveyId": "123456789123456789121212"
}
```

**----------------------------------------------------------------------------------------------------------------------------------------------**

### deleteSurvey

delete a survey questions and answers

#### Paramters

| Name     | Type   | Description                    |
| -------- | :----- | :----------------------------- |
| surveyId | string | the id of the survey to delete |

#### example

```typescript
{
    "surveyId": "123456789123456789121212"
}
```

**----------------------------------------------------------------------------------------------------------------------------------------------**
