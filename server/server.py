import os
import requests

from flask import Flask, jsonify, session, redirect, request
from flask_cors import CORS
from flask_session import Session

from dotenv import load_dotenv
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from flask_bcrypt import Bcrypt

import redis

from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
import json

from config import ApplicationConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://mrtech-site.vercel.app"}})
Session(app)
bcrypt = Bcrypt(app)
load_dotenv()

redis_cache = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("REDIS_PASSWORD"))

# Mongo client
client = MongoClient(f"mongodb+srv://{os.getenv("MONGODB_USERNAME")}:{os.getenv("MONGODB_PASSWORD")}@mrtech.ghx34.mongodb.net/")
db = client.mrtech
# collections
products = db.products
blogs = db.blogs
users = db.users

# OAuth with Google

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
app.secret_key = os.getenv("SECRET_KEY")

client_secrets = {
    "web": {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "project_id": os.getenv("PROJECT_ID"),
        "auth_uri": os.getenv("AUTH_URI"),
        "token_uri": os.getenv("TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_CERT"),
        "client_secret": os.getenv("SECRET_KEY"),
        "redirect_uris":[os.getenv("REDIRECT_URIS")] 
    } 
}
client_secrets_config = json.loads(json.dumps(client_secrets))

# client_secrets_config = json.loads(os.getenv("CLIENT_SECRET"))

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow HTTP traffic for local dev

flow = Flow.from_client_config(
	client_config=client_secrets_config,
	scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
	redirect_uri="https://mrtech-server.vercel.app/callback"
)

@app.route("/googleLogin")
def login():
    session["prevPage"] = request.args.get("prevPage")
    authorization_url, _ = flow.authorization_url()
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
        
    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)
    
    id_info = id_token.verify_oauth2_token(
		id_token=credentials._id_token,
		request=token_request,
		audience=GOOGLE_CLIENT_ID
	)
    
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    
    return redirect(f"https://mrtech-site.vercel.app{session.get("prevPage")}")

@app.route("/")
def index():
    return "Hello World"

@app.route("/logout")
def logout():
    session.clear()
    redis_cache.flushall()
    return "200"

@app.route("/authorized")
def authorized():
    
    print(session)
    
    if "google_id" in session:
        return jsonify({
      		"authorized": True, 
        	"user_info": {
				"user_id": session["google_id"],
				"name": session["name"]
			}
		})
    elif "user_id" in session:
        return jsonify({
			"authorized": True,
			"user_info": {
				"user_id": session["user_id"],
			}
		})
    else:
        return jsonify({"authorized": False})
 
 # Manual Authentication
 
@app.route("/user_info")
def get_current_user():
    user_id = session.get("user_id")
     
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = users.find_one({"_id": ObjectId(user_id)})
    
    return jsonify({
		"id": str(user["_id"]),
		"email": user["email"]
	})

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user_exists = users.find_one({"email": email})
    
    if user_exists:
        return jsonify({"error": "User already exists."}), 409
    
    hashedPassword = bcrypt.generate_password_hash(password)
    new_user = {
		"email": email,
		"password": hashedPassword
	}
    new_user_id = parse_json(users.insert_one(new_user).inserted_id)
    
    session["user_id"] = str(new_user_id)
    
    return jsonify({
        "id": new_user_id,
		"email": email
	})
    
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = users.find_one({"email": email})
    
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = str(user["_id"])
     
    return jsonify({
		"id": str(user["_id"]),
		"email": user["email"]
	})

# MongoDB connection and routes

# API route to retrieve products from db
@app.route("/products")
def product():
    allProducts = products.find()
    return parse_json(allProducts)

# API route to retrieve blogs from db
@app.route("/blogs")
def blog():
    allBlogs = blogs.find()
    return parse_json(allBlogs)

@app.route("/getPrice", methods=["POST"])
def getPrice():
	id = request.json["id"]
	local_curr = request.json["local_currency"]
    
	product = products.find_one({"id": id})
 
	if "salePrice" in product:
		return str(product["salePrice"][local_curr])
	return str(product["price"][local_curr])

# pymongo returns data in BSON format which raises an issue when trying to serialize the field "_id" with value "ObjectId"
# to fix this, we parse the BSON into JSON using below function
def parse_json(data):
    return json.loads(json_util.dumps(data))

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)