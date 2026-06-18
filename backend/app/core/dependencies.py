from fastapi import Header, HTTPException
from app.core.security import verify_token


def get_current_user(
    authorization: str = Header(
        default=None,
        alias="Authorization"
    )
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    parts = authorization.split(" ")

    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header"
        )

    token = parts[1]

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload