from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="gym_management"
)

# Utility function to execute queries
def execute_query(query, params=None, fetch=False):
    cursor = db.cursor(dictionary=True)
    cursor.execute(query, params or ())
    if fetch:
        result = cursor.fetchall()
        cursor.close()
        return result
    db.commit()
    cursor.close()
    return {"message": "Success"}

# -------------------- Members --------------------
@app.route('/members', methods=['GET'])
def get_members():
    return jsonify(execute_query(
        "SELECT id, first_name, last_name, email, phone, address, city, state, membershipType, dateOfBirth FROM members;", fetch=True))

@app.route('/members', methods=['POST'])
def add_member():
    data = request.json
    return execute_query(
        "INSERT INTO members (first_name, last_name, email, phone, address, city, state, membershipType, membershipStartDate, dateOfBirth, status, role) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (
            data['first_name'], data['last_name'], data['email'], data['phone'],
            data['address'], data['city'], data['state'], data['membershipType'],
            data['membershipStartDate'], data['dateOfBirth'], data['status'], data['role']
        )
    )


@app.route('/members/<int:id>', methods=['PUT'])
def update_member(id):
    data = request.json
    return execute_query(
        "UPDATE members SET first_name=%s, last_name=%s, email=%s, phone=%s, address=%s, city=%s, state=%s, membershipType=%s, "
        "membershipStartDate=%s, dateOfBirth=%s, status=%s, role=%s WHERE id=%s",
        (data['first_name'], data['last_name'], data['email'], data['phone'], data['address'], data['city'], data['state'],
         data['membershipType'], data['membershipStartDate'], data['dateOfBirth'], data['status'], data['role'], id))

@app.route('/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    return execute_query("DELETE FROM members WHERE id=%s", (id,))

# -------------------- Workouts --------------------
@app.route('/workouts', methods=['GET'])
def get_workouts():
    return jsonify(execute_query("SELECT * FROM workouts", fetch=True))

@app.route('/workouts', methods=['POST'])
def add_workout():
    data = request.json
    return execute_query("INSERT INTO workouts (name, description, duration, difficulty, calories, sessions, category, isFeatured, discount, weeks) "
                         "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                         (data['name'], data['description'], data['duration'], data['difficulty'], data['calories'], 
                          data['sessions'], data['category'], data['isFeatured'], data['discount'], data['weeks']))

@app.route('/workouts/<int:id>', methods=['PUT'])
def update_workout(id):
    data = request.json
    return execute_query("UPDATE workouts SET name=%s, description=%s, duration=%s, difficulty=%s, calories=%s, "
                         "sessions=%s, category=%s, isFeatured=%s, discount=%s, weeks=%s WHERE id=%s",
                         (data['name'], data['description'], data['duration'], data['difficulty'], data['calories'], 
                          data['sessions'], data['category'], data['isFeatured'], data['discount'], data['weeks'], id))

@app.route('/workouts/<int:id>', methods=['DELETE'])
def delete_workout(id):
    return execute_query("DELETE FROM workouts WHERE id=%s", (id,))

# -------------------- Memberships --------------------
@app.route('/memberships', methods=['GET'])
def get_memberships():
    return jsonify(execute_query("SELECT * FROM memberships", fetch=True))

@app.route('/memberships', methods=['POST'])
def add_membership():
    data = request.json
    return execute_query("INSERT INTO memberships (memberId, start_date, end_date, membership_type) VALUES (%s, %s, %s, %s)",
                         (data['memberId'], data['start_date'], data['end_date'], data['membership_type']))

@app.route('/memberships/<int:id>', methods=['PUT'])
def update_membership(id):
    data = request.json
    return execute_query("UPDATE memberships SET start_date=%s, end_date=%s, membership_type=%s WHERE id=%s",
                         (data['start_date'], data['end_date'], data['membership_type'], id))

@app.route('/memberships/<int:id>', methods=['DELETE'])
def delete_membership(id):
    return execute_query("DELETE FROM memberships WHERE id=%s", (id,))

# -------------------- Payments --------------------
@app.route('/payments', methods=['GET'])
def get_payments():
    return jsonify(execute_query("SELECT * FROM payments", fetch=True))

@app.route('/payments', methods=['POST'])
def add_payment():
    data = request.json
    return execute_query("INSERT INTO payments (memberId, memberName, memberEmail, amount, date, method, status) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                         (data['memberId'], data['memberName'], data['memberEmail'], data['amount'], data['date'], data['method'], data['status']))

@app.route('/payments/<int:id>', methods=['PUT'])
def update_payment(id):
    data = request.json
    return execute_query("UPDATE payments SET memberId=%s, memberName=%s, memberEmail=%s, amount=%s, date=%s, method=%s, status=%s WHERE id=%s",
                         (data['memberId'], data['memberName'], data['memberEmail'], data['amount'], data['date'], data['method'], data['status'], id))

@app.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    return execute_query("DELETE FROM payments WHERE id=%s", (id,))

if __name__ == '__main__':
    app.run(debug=True, port=3000)
