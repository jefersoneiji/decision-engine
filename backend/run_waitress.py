from app import create_app
from database import Config
from waitress import serve

app = create_app()['app']
serve(app, host=Config.HOST,port=Config.PORT)