from fastapi import FastAPI
from localmodel import chat_model

app = FastAPI()


@app.get("/")
def home():
    return {
        chat_model.invoke("Give a very sexy greeting to user?").content
    }


@app.get("/api/hello")
def hello():
    return {
        "message": "Hello World"
    }