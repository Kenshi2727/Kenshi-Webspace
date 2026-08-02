# data received in node needs to be converted to json string---> separate module for that

import sys
import json
import requests

# Pinging the server to indicate the script is running
req=requests.get("http://localhost:3000/ping")
data=req.json()

res={
    "Response":200,
    "Message":"AI Script executed successfully from python environment",
    "Data":data
}


print(json.dumps(res))
sys.stdout.flush()