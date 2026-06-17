from app.database.mongodb import db


def save_interview_report(report_data: dict):

    interview_report_collection = db["interview_reports"]

    result = interview_report_collection.insert_one(report_data)

    return str(result.inserted_id)



def get_report_by_session(session_id: str):

    interview_report_collection = db["interview_reports"]

    report = interview_report_collection.find_one({
        "session_id": session_id
    })

    return report