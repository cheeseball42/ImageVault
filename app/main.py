from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "API is working"}

@app.get("/health")
def health():
    return {"status": "ok"}