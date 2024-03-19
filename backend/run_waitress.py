from app import create_app
from database import Config
from waitress import serve

app = create_app()['app']
serve(app, host='127.0.0.1',port=Config.PORT)