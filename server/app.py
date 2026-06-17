from flask import Flask, request, make_response, jsonify
from models.init import db
from models.request import Request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_NOTIFICATION"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_pre_ping": True,
    "pool_recycle": 300,
}

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)


class RequestResource(Resource):
    def post(self):
        try:
            form_data = request.get_json()

            name = form_data.get("name")
            email = form_data.get("email")
            company = form_data.get("company")
            request_type = form_data.get("request_type")
            priority = form_data.get("priority")
            message = form_data.get("message")

            new_request = Request(
                name=name,
                email=email,
                company=company,
                request_type=request_type,
                priority=priority,
                message=message,
            )
            db.session.add(new_request)
            db.session.commit()

            return make_response(
                jsonify(
                    {
                        "message": "Request posted successfully",
                        "request": {
                            "id": new_request.id,
                            "name": new_request.name,
                            "email": new_request.email,
                            "company": new_request.company,
                            "request_type": new_request.request_type,
                            "priority": new_request.priority,
                            "message": new_request.message,
                            "status": new_request.status,
                            "created_at": new_request.created_at.isoformat(),
                        },
                    }
                ),
                201,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to create request"}), 500)

    def get(self):
        try:
            requests = Request.query.order_by(Request.id.desc()).all()

            return make_response(
                jsonify(
                    [
                        {
                            "id": req.id,
                            "name": req.name,
                            "email": req.email,
                            "company": req.company,
                            "request_type": req.request_type,
                            "priority": req.priority,
                            "message": req.message,
                            "status": req.status,
                            "created_at": req.created_at.isoformat(),
                        }
                        for req in requests
                    ]
                ),
                200,
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "error getting requests"}), 500)

    def patch(self, id):
        try:
            req = Request.query.filter_by(id=id).first()

            if not req:
                return make_response(jsonify({"message": "Request not found"}), 404)

            form_data = request.get_json()

            req.status = form_data.get("status")

            db.session.commit()

            return make_response(
                jsonify({"message": "Status updated successfully"}), 200
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "Failed to update status"}), 500)


api.add_resource(RequestResource, "/api/v1/requests", "/api/v1/requests/<int:id>")


if __name__ == "__main__":
    app.run(debug=True)
