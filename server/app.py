from flask import Flask
from flask_cors import CORS
from utils.db_postgresql import db  
from dotenv import load_dotenv
from api.routes import api_blueprint
from flask_migrate import Migrate

# Load environment variables
load_dotenv('.flaskenv')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Phil2:12-16@localhost/llm_evaluation'

db.init_app(app)

migrate = Migrate(app, db)

CORS(app, resources={r"/*": {"origins": "*"}})  

app.register_blueprint(api_blueprint, url_prefix='/api')

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
