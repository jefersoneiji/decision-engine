from app import create_app
from database import Config

app = create_app()['app']
app.run(port=Config.PORT)