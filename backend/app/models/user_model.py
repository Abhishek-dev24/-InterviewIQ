from pydantic import BaseModel

# register 
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    
# login
class UserLogin(BaseModel):
    email: str
    password: str