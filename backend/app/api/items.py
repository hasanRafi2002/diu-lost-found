from typing import Optional


from fastapi import UploadFile, File
from app.services.upload_service import save_item_image, delete_item_image

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.item import ItemType, ItemStatus
from app.schemas.item import (
    ItemCreate, ItemUpdate, ItemResponse, ItemListResponse, ItemStatusUpdate
)
from app.services import item_service

router = APIRouter(prefix="/api/items", tags=["Items"])


@router.post("", response_model=ItemResponse, status_code=201)
def create_item(
    item_in: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return item_service.create_item(db, item_in, current_user)


@router.get("", response_model=ItemListResponse)
def list_items(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    item_type: Optional[ItemType] = None,
    category_id: Optional[int] = None,
    status: Optional[ItemStatus] = None,
    building: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    total, items = item_service.list_items(
        db, page, page_size, item_type, category_id, status, building, search
    )
    return ItemListResponse(total=total, page=page, page_size=page_size, items=items)


@router.get("/my-reports", response_model=ItemListResponse)
def my_reports(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total, items = item_service.get_my_reports(db, current_user, page, page_size)
    return ItemListResponse(total=total, page=page, page_size=page_size, items=items)


@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    return item_service.get_item_detail(db, item_id)


@router.put("/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item_in: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return item_service.update_item(db, item_id, item_in, current_user)


@router.post("/{item_id}/image", response_model=ItemResponse)
async def upload_item_image(
    item_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = item_service.get_item_or_404(db, item_id)
    item_service.check_ownership(item, current_user)

    # remove old image if one exists, to avoid orphaned files
    delete_item_image(item.image_url)

    image_url = await save_item_image(file)
    item.image_url = image_url
    db.commit()
    db.refresh(item)
    return item



@router.patch("/{item_id}/status", response_model=ItemResponse)
def update_status(
    item_id: int,
    status_in: ItemStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return item_service.update_item_status(db, item_id, status_in.status, current_user)


@router.delete("/{item_id}", status_code=204)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item_service.delete_item(db, item_id, current_user)
    return None
