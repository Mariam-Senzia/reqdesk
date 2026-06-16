from models.init import db
from models.request import Request
from app import app

sample_requests = [
    {
        "name": "Ruth Lepley",
        "email": "ruth@acmecorp.com",
        "company": "Acme Corp",
        "request_type": "Partnership",
        "priority": "High",
        "message": "We are interested in exploring a partnership opportunity with your team. Our company works with several SMEs in the region and we believe there could be strong synergy between our platforms.",
    },
    {
        "name": "John Mwangi",
        "email": "john.mwangi@techsavvy.co.ke",
        "company": "TechSavvy Kenya",
        "request_type": "General Feedback",
        "priority": "Low",
        "message": "The platform is very intuitive and easy to use. Would love to see email notifications added so our team doesn't have to keep checking the dashboard manually.",
    },
    {
        "name": "Amara Osei",
        "email": "amara.osei@buildfast.gh",
        "company": "BuildFast Ghana",
        "request_type": "Other",
        "priority": "Medium",
        "message": "We have a unique use case that doesn't fit the standard categories. Could someone from your team reach out so we can walk through it together?",
    },
    {
        "name": "Mariam Senzia",
        "email": "mariamsenzia@gmail.com",
        "company": "Fullhouse",
        "request_type": "Bug",
        "priority": "High",
        "message": "The donate button is not working on mobile devices. Tested on both Android and iOS browsers and the issue persists on both.",
    },
    {
        "name": "Linda Achieng",
        "email": "linda.achieng@retailhub.co.ke",
        "company": "RetailHub",
        "request_type": "Feature Request",
        "priority": "Medium",
        "message": "Would be great to have bulk export of requests as a CSV file. This would help our team generate weekly reports without manually copying data.",
    },
    {
        "name": "Keith Otieno",
        "email": "keith.otieno@finflow.co.ke",
        "company": "FinFlow",
        "request_type": "Partnership",
        "priority": "Medium",
        "message": "We'd like to discuss integrating your API into our platform to streamline how our customers submit support requests.",
    },
]

with app.app_context():
    Request.query.delete()
    db.session.commit()

    for req in sample_requests:
        new_request = Request(
            name=req["name"],
            email=req["email"],
            company=req["company"],
            request_type=req["request_type"],
            priority=req["priority"],
            message=req["message"],
        )
        db.session.add(new_request)

    db.session.commit()
    print("Request seeded successfully")
