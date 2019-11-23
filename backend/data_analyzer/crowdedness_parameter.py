import os
import requests
import pandas as pd

LOW_QUANTILE = 0.05
HIGH_QUANTILE = 0.95


def generate(data, id: int):
    mac_counts = data[data['device'] == id]['universal_mac_count']
    return {"low": int(mac_counts.quantile(LOW_QUANTILE)), "high": int(mac_counts.quantile(HIGH_QUANTILE))}


data = pd.DataFrame(requests.get("https://harrynull.tech/cm/data/export?key=" + os.environ["KEY"]).json()['data'])
res = {}
for i in range(1, data['device'].max() + 1):
    parameters = generate(data, i)
    print("Updating", i,
          requests.get("https://harrynull.tech/cm/data/update_parameters?key={}&device_id={}&name={}&value={}".
                       format(os.environ["KEY"], i, "min", parameters["low"])).json())
    print("Updating", i,
          requests.get("https://harrynull.tech/cm/data/update_parameters?key={}&device_id={}&name={}&value={}".
                       format(os.environ["KEY"], i, "max", parameters["high"])).json())

print("Done")
