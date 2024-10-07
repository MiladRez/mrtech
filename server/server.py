import os
import pathlib
import requests
from flask import Flask, session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)
CORS(app)

# OAuth with Google

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
app.secret_key = os.environ.get("SECRET_KEY")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow HTTP traffic for local dev

flow = Flow.from_client_secrets_file(
	client_secrets_file=client_secrets_file,
	scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
	redirect_uri="http://127.0.0.1:5000/callback"
)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401) # Unauthorized access
        else:
            return function()
    return wrapper
        
@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    
    if not session["state"] == request.args["state"]:
        abort(500) # state doesn't match
    
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
    return redirect("/protected_area")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("http://localhost:5173/login")

@app.route("/protected_area")
@login_is_required
def protected_area():
    return redirect("http://localhost:5173/home")

# MongoDB connection and routes

client = MongoClient("localhost", 27017)
db = client.mrtech
# collections
products = db.products
blogs = db.blogs

# test API Route
@app.route("/test")
def test():
    return [
        {
            "name": "RTX4090",
            "price": "2999.99"
        },
        {
            "name": "RTX4070",
            "price": "699.99"
        }
    ]

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

# pymongo returns data in BSON format which raises an issue when trying to serialize the field "_id" with value "ObjectId"
# to fix this, we parse the BSON into JSON using below function
def parse_json(data):
    return json.loads(json_util.dumps(data))

if __name__ == "__main__":
    app.run(debug=True)