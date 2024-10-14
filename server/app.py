from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from api.routes import api_blueprint

# Load environment variables
load_dotenv('.flaskenv')

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})  

app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
