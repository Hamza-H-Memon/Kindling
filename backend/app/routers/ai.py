from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.llm import sort_brain_dump

router = APIRouter(prefix="/ai", tags=["ai"])


class BrainDumpRequest(BaseModel):
    text: str


class SortedTask(BaseModel):
    title: str
    step: str
    mins: int
    energy: str


@router.post("/sort", response_model=List[SortedTask])
def sort(request: BrainDumpRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    try:
        return sort_brain_dump(request.text)
    except Exception:
        raise HTTPException(status_code=502, detail="AI sorting failed")
