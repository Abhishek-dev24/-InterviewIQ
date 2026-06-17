# This service talks ONLY to question_bank collection

from app.database.mongodb import db


question_bank_collection = db["question_bank"]


def find_existing_question(
    role,
    experience_level,
    tech_stack
):

    question = question_bank_collection.find_one({
        "role": role,
        "experience_level": experience_level,
        "tech_stack": tech_stack 
    })

    return question


def save_question_bank(
    question_data
):

    question_bank_collection.insert_one(
        question_data
    )