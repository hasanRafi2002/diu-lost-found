from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from fastapi.staticfiles import StaticFiles


from app.api import auth, items, categories, claims, notifications, admin


app = FastAPI(title="DIU Lost &Found API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(items.router)
app.include_router(categories.router)
app.include_router(claims.router)
app.include_router(notifications.router)
app.include_router(admin.router)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")



@app.get("/health")
def health_check():
    return {"status": "ok"}