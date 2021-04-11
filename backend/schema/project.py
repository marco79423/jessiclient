import datetime as dt
from typing import List, Dict

import pydantic


def to_camel(string: str) -> str:
    return ''.join(word.capitalize() if idx != 0 else word for idx, word in enumerate(string.split('_')))


class ProjectSettingDataModel(pydantic.BaseModel):
    max_message_count: pydantic.conint(ge=1)

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectConnectionDataModel(pydantic.BaseModel):
    url: pydantic.constr(regex=r'^wss?://.*')

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectRequestDataModel(pydantic.BaseModel):
    body: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectScheduleDataModel(pydantic.BaseModel):
    time_interval: pydantic.conint(ge=1)

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class FavoriteRequestDataModel(pydantic.BaseModel):
    id: str
    name: pydantic.constr(min_length=1)
    body: pydantic.constr(min_length=1)

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectFavoriteRequestDataModel(pydantic.BaseModel):
    ids: pydantic.conlist(str)
    entities: Dict[str, FavoriteRequestDataModel]

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class MessageDataModel(pydantic.BaseModel):
    id: pydantic.constr(min_length=1)
    time: dt.datetime
    source: pydantic.constr(regex=r'(server|client)')
    body: pydantic.constr(min_length=1)

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectMessageDataModel(pydantic.BaseModel):
    ids: List[str]
    entities: Dict[str, MessageDataModel]

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid


class ProjectDataModel(pydantic.BaseModel):
    setting: ProjectSettingDataModel
    connection: ProjectConnectionDataModel
    request: ProjectRequestDataModel
    schedule: ProjectScheduleDataModel
    favorite_request: ProjectFavoriteRequestDataModel
    message: ProjectMessageDataModel

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
        extra = pydantic.Extra.forbid
