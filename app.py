from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB (hosted on Atlas or locally)
client = MongoClient("mongodb://localhost:27017/")
db = client["employee_db"]               # Database name
collection = db["employees"]             # Collection/table name

@app.route("/employees", methods=["GET"])
def get_employees():
    # Find all employees, remove '_id' to avoid React error
    employees = list(collection.find({}, {"_id": 0}))
    return jsonify(employees)

@app.route("/add-employee", methods=["POST"])
def add_employee():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({"message": "Employee added!"})

if __name__ == "__main__":
    app.run(debug=True)
