# backend/app.py

from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS

from config import db
from models import Band, Venue, Show, User, Review, ShowBand, Musician
from routes import shows_bp, reviews_bp, bands_bp, venues_bp, users_bp, musicians_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.json.compact = False

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    app.register_blueprint(shows_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(bands_bp)
    app.register_blueprint(venues_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(musicians_bp)

    @app.route('/')
    def home():
        return {'message': 'Music Band API is running', 'status': 'healthy'}
    
    @app.route('/health')
    def health():
        return {'status': 'healthy', 'database': 'connected'}, 200

    return app

app = create_app()

with app.app_context():
    try:
        db.create_all()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization error: {e}")

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
