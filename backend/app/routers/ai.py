from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.llm import sort_brain_dump, make_step_smaller

router = APIRouter(prefix="/ai", tags=["ai"])


class BrainDumpRequest(BaseModel):
    text: str


class SortedTask(BaseModel):
    title: str
    step: str
    mins: int
    energy: str


class SmallerRequest(BaseModel):
    title: str
    step: str


class SmallerResponse(BaseModel):
    step: str


@router.post("/sort", response_model=List[SortedTask])
def sort(request: BrainDumpRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    try:
        return sort_brain_dump(request.text)
    except Exception:
        raise HTTPException(status_code=502, detail="AI sorting failed")


@router.post("/smaller", response_model=SmallerResponse)
def smaller(request: SmallerRequest):
    try:
        new_step = make_step_smaller(request.title, request.step)
        return {"step": new_step}
    except Exception:
        raise HTTPException(status_code=502, detail="AI request failed")
