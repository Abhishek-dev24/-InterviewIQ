from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    mongodb_url: str = Field(
        default="mongodb://localhost:27017",
        validation_alias=AliasChoices(
            "MONGO_URI",
            "MONGODB_URL",
            "mongodb_url",
        ),
    )
    database_name: str = Field(
        default="interviewiq",
        validation_alias=AliasChoices(
            "DATABASE_NAME",
            "database_name",
        ),
    )
    secret_key: str = Field(
        validation_alias=AliasChoices(
            "SECRET_KEY",
            "secret_key",
        ),
    )
    algorithm: str = Field(
        default="HS256",
        validation_alias=AliasChoices(
            "ALGORITHM",
            "algorithm",
        ),
    )
    gemini_api_key: str = Field(
        default="",
        validation_alias=AliasChoices(
            "GEMINI_API_KEY",
            "gemini_api_key",
        ),
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
