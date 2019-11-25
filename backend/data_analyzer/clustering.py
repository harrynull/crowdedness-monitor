import os
import sys
import requests
import pandas as pd
import numpy as np
import json
from datetime import datetime
from sklearn.cluster import KMeans


def generate_for_weekday(clustering, day: int):
    hour = clustering[clustering['weekday'] == day]
    ret = []
    for i in range(24):
        x = np.array(hour[hour['hour'] == i]['crowdedness'])
        x = x.reshape(-1, 1)
        km = KMeans(n_clusters=1)
        if len(x) == 0:
            return []
        km.fit(x)
        ret.append(int(km.cluster_centers_))
    return ret


def generate(data, id: int):
    loc = data[data['device'] == id]
    loc.index = range(len(loc))
    clustering = loc.drop(['device', 'location', 'mac_count', 'packet_count', 'time', 'universal_mac_count'],
                          axis=1)
    ret = {}
    for i in range(0, 7):
        ret[i] = generate_for_weekday(clustering, i)
    return ret


data = pd.DataFrame(requests.get("https://harrynull.tech/cm/data/export?key=" + os.environ["KEY"]).json()['data'])
data['datetime'] = data['time'].map(lambda x: datetime.fromtimestamp(x))
data['hour'] = data['datetime'].map(lambda x: x.hour)
data['weekday'] = data['datetime'].map(lambda x: x.weekday())
res = {}
for i in range(1, data['device'].max() + 1):
    res[i] = generate(data, i)

json.dump(res, open('clustering.json', 'w'))
