"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(pass_hash, password, salt):
    return check_password_hash(pass_hash, f"{password}{salt}")    

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def handle_register():
    data = request.json
    email = data.get ("email", None)
    lastname = data.get ("lastname", None)
    password = data.get ("password", None)
    salt = b64encode(os.urandom(32)).decode("utf-8")
    
    if email is None or password is None or lastname is None:
        return jsonify("Missing data"), 400  

    user = User(email=email, lastname=lastname, password=set_password(password, salt), salt=salt)

        #or:
        # user = User()
        # user.email = email
        # user.lastname = lastname
        # user.password = set_password(password, salt)
        # user.salt = salt

    db.session.add(user)

    try:
        db.session.commit()
        return jsonify("Success"), 201  
    except Exception as error:
        db.session.rollback()
        return jsonify("Error: {error.args}"), 500  

@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json
    email = data.get ("email", None)
    password = data.get ("password", None)

    if email is None or password is None:
        return jsonify("Missing data"), 400  

    else:
        user = User.query.filter_by(email=email).first()    
        if user is None:
            return jsonify("Bad credentials"), 400 
        else:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity=str(user.id))

                return jsonify({
                    "token": token
                }), 200
            else:
                return jsonify("Bad credentials"), 400 
   

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "lastname": user.lastname, "email": user.email, "avatar": user.avatar }), 200

@api.route("/user", methods=["GET"])
@jwt_required()
def access_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200    