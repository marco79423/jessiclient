import json
import uuid

import fastapi
import redis
import uvicorn
from omegaconf import OmegaConf

app = fastapi.FastAPI()
conf = OmegaConf.load('./config.yml')


def get_redis_client():
    redis_client = redis.Redis(
        host=conf.server.redis.host,
        port=conf.server.redis.port,
    )
    try:
        yield redis_client
    finally:
        redis_client.close()


@app.post('/api/flash-projects', status_code=201)
async def create_tmp_project(request: fastapi.Request, redis_client=fastapi.Depends(get_redis_client)):
    project_code = str(uuid.uuid4())
    redis_client.set(f'jessiclient:projects:{project_code}', await request.body(), conf.flash_project.expired_time)
    return {
        'data': {
            'projectCode': project_code,
        },
    }


@app.get('/api/flash-projects/{project_code}')
async def get_flash_project(project_code: str, redis_client=fastapi.Depends(get_redis_client)):
    data = redis_client.get(f'jessiclient:projects:{project_code}')
    if not data:
        raise fastapi.HTTPException(status_code=404, detail='project 不存在')

    flash_project = json.loads(data)
    return {
        'data': flash_project,
    }


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=9001)
