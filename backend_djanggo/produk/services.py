import requests
import hashlib
from datetime import datetime

url = "https://recruitment.fastprint.co.id/tes/api_tes_programmer"

def get_fastprint_data():
    
    session = requests.Session()
    res_get = session.get(url)
    username = res_get.headers["X-Credentials-Username"].split(" ")[0]
    server_date = res_get.headers["Date"]
    today = datetime.now()
    dt = datetime.strptime(server_date, "%a, %d %b %Y %H:%M:%S GMT")
    raw_password = f"bisacoding-{today.day:02d}-{today.month:02d}-{str(today.year)[-2:]}"
    password = hashlib.md5(raw_password.encode()).hexdigest()

    print("USERNAME:", username)
    print("RAW PASSWORD:", raw_password)
    print("MD5:", password)

    payload = {
        "username": username,
        "password": password
    }

    res_post = session.post(url, data=payload)    
    login_response = session.post(url, data=payload)
    result = login_response.json()

    if result.get("error") == 1:
        raise Exception(result.get("ket"))

    return result
