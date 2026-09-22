from typing import Optional

from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    step: str
    mins: int = 15
    energy: str = "Medium effort"
    carried: bool = False
    done: bool = False
    order: int = 0
