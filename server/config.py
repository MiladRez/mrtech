from redis import Redis
import os
from datetime import timedelta

class ApplicationConfig:
	SECRET_KEY = os.environ.get("SECRET_KEY")
    
	SESSION_TYPE = "redis"
	SESSION_PERMANENT = False
	SESSION_USE_SIGNER = True
	SESSION_COOKIE_SAMESITE = None
	SESSION_COOKIE_SECURE = False
	SESSION_REDIS = Redis(host='redis', port=6379)