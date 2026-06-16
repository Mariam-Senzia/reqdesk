from .init import db
from datetime import datetime


class Request(db.Model):
    __tablename__ = "requests"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    request_type = db.Column(
        db.Enum(
            "Bug",
            "Feature Request",
            "General Feedback",
            "Partnership",
            "Other",
            name="request_type_enum",
        ),
        nullable=False,
    )
    priority = db.Column(
        db.Enum("Low", "Medium", "High", name="priority_enum"), nullable=False
    )
    message = db.Column(db.Text, nullable=False)
    status = db.Column(
        db.Enum("New", "In Review", "Resolved", "Rejected", name="status_enum"),
        default="New",
        nullable=False,
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
