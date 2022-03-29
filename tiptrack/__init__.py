import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin

app = Flask(__name__)#, static_folder="build", static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///MainDataBase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from tiptrack import routes