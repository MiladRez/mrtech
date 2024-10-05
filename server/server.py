from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("localhost", 27017)
db = client.flask_database


# Store database API Route
@app.route("/store")
def store():
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

if __name__ == "__main__":
    app.run(debug=True)