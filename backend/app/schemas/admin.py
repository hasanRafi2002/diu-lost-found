from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    total_items: int
    total_lost: int
    total_found: int
    total_active: int
    total_resolved: int
    total_claims: int
    total_pending_claims: int


class UserRoleUpdate(BaseModel):
    role: str
