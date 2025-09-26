#!/usr/bin/env python3

from app import create_app, db
from models import Band, Venue, Show, User, Review, ShowBand, Musician
from datetime import datetime

def create_sample_data():
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Create sample venues
        venue1 = Venue(name="Madison Square Garden", city="New York", address="4 Pennsylvania Plaza", capacity=20000)
        venue2 = Venue(name="Blue Note", city="New York", address="131 W 3rd St", capacity=300)
        venue3 = Venue(name="Warehouse District", city="Los Angeles", address="Downtown LA", capacity=1500)
        
        db.session.add_all([venue1, venue2, venue3])
        db.session.commit()
        
        # Create sample bands
        band1 = Band(name="Thunder Strike", genre="Rock", description="High-energy rock band", formed_year=2018)
        band2 = Band(name="Midnight Ensemble", genre="Jazz", description="Smooth jazz collective", formed_year=2015)
        band3 = Band(name="Neon Circuits", genre="Electronic", description="Electronic music pioneers", formed_year=2020)
        
        db.session.add_all([band1, band2, band3])
        db.session.commit()
        
        # Create sample shows
        show1 = Show(
            title="Rock Legends Live",
            date="2024-02-15",
            time="20:00",
            ticket_price=75.00,
            description="An electrifying night of classic rock with legendary performances that will shake the venue to its core.",
            venue_id=venue1.id
        )
        
        show2 = Show(
            title="Jazz Under the Stars",
            date="2024-02-20",
            time="19:30",
            ticket_price=45.00,
            description="Smooth jazz melodies under the moonlight with world-class musicians creating magical moments.",
            venue_id=venue2.id
        )
        
        show3 = Show(
            title="Electronic Pulse",
            date="2024-02-25",
            time="21:00",
            ticket_price=60.00,
            description="Cutting-edge electronic music with mind-bending visuals and bass that you'll feel in your soul.",
            venue_id=venue3.id
        )
        
        db.session.add_all([show1, show2, show3])
        db.session.commit()
        
        # Create show-band associations
        show_band1 = ShowBand(show_id=show1.id, band_id=band1.id, set_order=1)
        show_band2 = ShowBand(show_id=show2.id, band_id=band2.id, set_order=1)
        show_band3 = ShowBand(show_id=show3.id, band_id=band3.id, set_order=1)
        
        db.session.add_all([show_band1, show_band2, show_band3])
        db.session.commit()
        
        # Create sample user
        user1 = User(username="musicfan", email="fan@music.com", first_name="Music", last_name="Fan")
        db.session.add(user1)
        db.session.commit()
        
        # Create sample reviews
        review1 = Review(rating=5, comment="Absolutely incredible! The energy was off the charts and the sound quality was perfect.", user_id=user1.id, show_id=show1.id)
        review2 = Review(rating=5, comment="Pure magic! The atmosphere was perfect and the musicians were world-class.", user_id=user1.id, show_id=show2.id)
        
        db.session.add_all([review1, review2])
        db.session.commit()
        
        print("✅ Sample data created successfully!")
        print(f"Created {len(db.session.query(Show).all())} shows")
        print(f"Created {len(db.session.query(Band).all())} bands")
        print(f"Created {len(db.session.query(Venue).all())} venues")
        print(f"Created {len(db.session.query(Review).all())} reviews")

if __name__ == '__main__':
    create_sample_data()