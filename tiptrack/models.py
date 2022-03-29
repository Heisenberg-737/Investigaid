from tiptrack import db
import datetime


class User(db.Model):
    __tablename__ = 'Police'
    sno = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    station = db.Column(db.String(100))
    
class Tips(db.Model):
    __tablename__ = 'Tips'
    sno = db.Column(db.Integer, primary_key=True, autoincrement=True)
    address = db.Column(db.String(100))
    category = db.Column(db.String(100))
    brief_descr = db.Column(db.String(100))
    extended_descr = db.Column(db.String(10000))
    time = db.Column(db.String(100))
    location = db.Column(db.String(100))
    station = db.Column(db.String(100))
    crimeperson = db.Column(db.String(100))
    name_accu = db.Column(db.String(100))
    tip_score = db.Column(db.Integer)
    hash = db.Column(db.String(10000))