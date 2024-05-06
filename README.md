# trainer-api
API for the ai-trainer

To run the ai-trainer, you first have to make a get request using (http://127.0.0.1:8000/api/v1/client)
This returns a json object, which looks something like this:
```
{
    status: 'success',
    threadID: 'thread_xxxxxxxxxxxx'
}
```

Afterwards you run a post on the same url (http://127.0.0.1:8000/api/v1/client)
In this post, you have to create a body with the following format:
```
{
    "threadID": 'thread_xxxxxxxxxxxx',
    "content": 'I need help creating a workout for today'
}
```

Right after this post request you then have to create another post request with this url (http://127.0.0.1:8000/api/v1/client/bot)
In here, you have to create a body with the following format:
```
{
    "threadID": 'thread_xxxxxxxxxxxx',
}
```
This will return an anwser to the question you send eailer on!