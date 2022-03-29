import json
from flask import request, jsonify, g
from tiptrack.models import User, Tips, db
from tiptrack import app
import datetime
import random
from datetime import timedelta
from block import newtipp, getTippInfo
from flask_cors import CORS, cross_origin

cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

# Frontend Routes


# Backend Routes


@app.route('/backend/authenticate/', methods=["GET", "POST", "OPTIONS"])
@cross_origin(origin='*')
def authentication():
    content = request.get_json()
    email = content["email"]
    password = content["password"]
    # print(content)
    # email = "dwarka@delhipolice.com"
    # password = "admin"

    row = User.query.filter(User.email == email,
                            User.password == password).first()

    if row != []:
        return 'Login Valid', 200
    else:
        return 'Login Invalid', 500


@app.route('/backend/dashboard/', methods=["GET"])
@cross_origin()
def dashboard():

    email = request.args.get('email')
    # email = "dwarka@delhipolice.com"

    row = User.query.filter(User.email == email).first()
    station = row.station

    rows = Tips.query.filter(Tips.station == station).all()

    List = []

    for x in rows:
        Dict = {
            'sno': x.sno,
            'category': x.category,
            'brief': x.brief_descr,
            'extended': x.extended_descr,
            'time': x.time,
            'location': x.location,
            'station': x.station,
            'crimeperson': x.crimeperson,
            'name_accu': x.name_accu,
            'tip_score': x.tip_score
        }
        List.append(Dict)

    return json.dumps(List)
'''
Sample Output for this route:
[
  {
    "sno": 1,
    "category": "Rape",
    "brief": "Saw rape near metro station",
    "extended": "Saw two men raping a 20-25 year old girl at around 12 am near dwarka mor metro station",
    "time": "3/29/2022, 6:30:02 AM",
    "location": "Dwarka Mor Metro Station",
    "station": "Dwarka, Delhi",
    "crimeperson": "Yes",
    "name_accu": "",
    "tip_score": 73
  },
  {
    "sno": 2,
    "category": "Muder",
    "brief": "Saw murder near sector-3",
    "extended": "Saw a man murdering a 20-25 year old boy at around 2 am near dwarka sector-3. The man was in his mid fourties and was wearing brown shirt",
    "time": "3/29/2022, 6:37:02 AM",
    "location": "Dwarka Sector-3",
    "station": "Dwarka, Delhi",
    "crimeperson": "Yes",
    "name_accu": "",
    "tip_score": 80
  }
]
'''


@app.route('/backend/tip/', methods=["POST", "GET"])
@cross_origin()
def backend_tip():
    content = request.get_json()
    add = content["address"]
    cat = content["category"]
    brief = content["brief_descr"]
    extended = content["extended_descr"]
    time = content["time"]
    location = content["location"]
    station = content["station"]
    crimeperson = content["crimeperson"]
    name_accu = content["name_accu"]
    tip_score = random.randint(60, 80)

    # add = "8ABBaE73f0bD8bBde21d86356f5ab2C927bd22dc"
    # cat = "Muder"
    # brief = "Saw murder near sector-3"
    # extended = "Saw a man murdering a 20-25 year old boy at around 2 am near dwarka sector-3. The man was in his mid fourties and was wearing brown shirt"
    # time = "3/29/2022, 6:37:02 AM"
    # location = "Dwarka Sector-3"
    # station = "Dwarka, Delhi"
    # crimeperson = "Yes"
    # name_accu = ""

    # tip_score = model(xyz)
    hash = newtipp(add, cat, brief, time, location, station, tip_score)

    row = Tips(address=add, category=cat, brief_descr=brief, extended_descr=extended, time=time, location=location, station=station,
               crimeperson=crimeperson, name_accu=name_accu, tip_score=tip_score, hash=hash)

    db.session.add(row)
    db.session.commit()

    # hash = "sferefnnk48979294"
    
    Dict = {
        'hash': hash
    }

    List = []
    List.append(Dict)

    return json.dumps(List)