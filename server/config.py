from dotenv import load_dotenv
import redis
import os

class ApplicationConfig:
    load_dotenv()
    SECRET_KEY = os.getenv("SECRET_KEY")
    
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = True
    SESSION_REDIS = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("REDIS_PASSWORD"))