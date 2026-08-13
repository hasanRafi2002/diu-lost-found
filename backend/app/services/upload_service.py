import os
import uuid
from pathlib import Path

from fastapi import UploadFile, HTTPException, status

from app.core.config import settings

UPLOAD_DIR = Path("uploads/items")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = set(settings.ALLOWED_IMAGE_TYPES.split(","))
MAX_SIZE_BYTES = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024


async def save_item_image(file: UploadFile) -> str:
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type. Allowed: {', '.join(ALLOWED_TYPES)}",
        )

    contents = await file.read()
    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Max size: {settings.MAX_UPLOAD_SIZE_MB}MB",
        )

    extension = os.path.splitext(file.filename)[1].lower() or ".jpg"
    if extension not in (".jpg", ".jpeg", ".png", ".webp"):
        extension = ".jpg"

    filename = f"{uuid.uuid4().hex}{extension}"
    filepath = UPLOAD_DIR / filename

    with open(filepath, "wb") as f:
        f.write(contents)

    return f"/uploads/items/{filename}"


def delete_item_image(image_url: str | None) -> None:
    if not image_url:
        return
    filename = os.path.basename(image_url)
    filepath = UPLOAD_DIR / filename
    if filepath.exists():
        filepath.unlink()
