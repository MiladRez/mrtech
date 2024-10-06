from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)
CORS(app)

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