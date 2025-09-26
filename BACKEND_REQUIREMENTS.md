# Backend Integration Requirements

## Frontend Repository
**GitHub Link:** `https://github.com/[YOUR_USERNAME]/music-band-reviews`

## Required API Endpoints
The React frontend expects these Flask endpoints:

### Shows
- `GET /shows` - Return all shows
- `GET /shows/:id` - Return specific show with details

### Reviews  
- `GET /shows/:id/reviews` - Return reviews for a show
- `POST /reviews` - Create new review
- `PATCH /reviews/:id` - Update existing review
- `DELETE /reviews/:id` - Delete review

## CORS Configuration Required
Add to your Flask app:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
```

## Expected Data Structure

### Show Object
```json
{
  "id": 1,
  "title": "Show Name",
  "venue": "Venue Name" or {"name": "Venue Name", "location": "Address"},
  "date": "2024-01-15",
  "description": "Show description",
  "genre": "Rock",
  "bands": [{"id": 1, "name": "Band Name"}]
}
```

### Review Object
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Great show!",
  "user_name": "Reviewer Name",
  "show_id": 1
}
```

## Frontend URL
The React app runs on: `http://localhost:3000`
Backend should run on: `http://127.0.0.1:5000`

## Installation
```bash
pip install flask-cors
```