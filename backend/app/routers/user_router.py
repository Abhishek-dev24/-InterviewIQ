

from fastapi import APIRouter,HTTPException,Depends
from app.core.security import hash_password, verify_password , create_access_token
from app.models.user_model import UserCreate, UserLogin
from app.services.user_service import create_user, get_user_by_email
from app.core.dependencies import get_current_user

router = APIRouter()

#  register api 
@router.post("/register")


async def register(user: UserCreate):
    
    existing_user = get_user_by_email(user.email)
    
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    
    hashed_pwd = hash_password(user.password)

    user_data = user.dict()

    user_data["password"] = hashed_pwd

    user_id = create_user(user_data)

    return {
        "message": "User Registered",
        "user_id": user_id
    }
    

#  login api  
@router.post("/login")
async def login(user: UserLogin):

    # check user exists
    existing_user = get_user_by_email(user.email)

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # verify password
    is_valid = verify_password(
        user.password,
        existing_user["password"]
    )

    if not is_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
    {
        "email": existing_user["email"]
    }
    )

    return {
    "access_token": token,
    "token_type": "bearer"
   }
    

# protected route 
@router.get("/profile")
async def profile(
    current_user = Depends(get_current_user)
):

    return {
        "message": "Protected route accessed",
        "user": current_user
    }