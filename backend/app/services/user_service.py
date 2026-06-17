from app.database.mongodb import db

users_collection = db["users"]


# This service talks ONLY to users collection
def create_user(user_data):

    result = users_collection.insert_one(
        user_data
    )

    return str(result.inserted_id)



# This function is used to fetch a user by their email address, which can be useful for authentication, profile management, or other user-related operations.
def get_user_by_email(
        email: str
):

    user = users_collection.find_one(
        {"email": email}
    )

    return user