from flask import Flask, request, make_response, jsonify
from models.init import db
from models.request import Request
from flask_migrate import Migrate
from flask_restful import Api, Resource

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_NOTIFICATION"] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


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
            requests = Request.query.all()

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


api.add_resource(RequestResource, "/api/v1/requests")


if __name__ == "__main__":
    app.run(debug=True)
