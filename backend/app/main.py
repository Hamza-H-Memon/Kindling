from fastapi import FastAPI

app = FastAPI(title="Kindling API")


@app.get("/health")
def health():
    return {"status": "ok"}
