from flask import Flask
from models.init import db
from models.request import Request
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_NOTIFICATION"] = False

db.init_app(app)
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)
