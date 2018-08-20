# Quora Automation

Module for adding a question to Quora and retrieving the top answer.

## Add a question

```javascript
import {addQuestion} from 'quora-automation'


const result = await addQuestion('is donald trump a lier?', {
        username: process.env.USERNAME // quora username,
        password: process.env.PASSWORD // quora password
    })
```

Will return either an error or successful add.

## Find a question

```javascript
import {findQuestion} from 'quora-automation'

const result = await findQuestion('is donald trump a lier?', deployment)

```

Will either return the answer or that the question can't be found