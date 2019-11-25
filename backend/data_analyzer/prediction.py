import numpy as np
import pandas as pd
from sklearn.externals import joblib
import datetime
import time

from app.database import Device
from data_analyzer.crowdedness import generate_crowdedness_from_universal_mac_count


cache = {}
last_cache_time = {}


def predict(device_id: int, time_now: int):
    if device_id in cache and time.time() - last_cache_time[device_id] < 5*60:
        return cache[device_id]
        
    current_time = datetime.datetime.fromtimestamp(time_now)
    feature_weekday = [int(i == current_time.weekday()) for i in range(0, 7)]
    feature_hour = [int(i == current_time.hour) for i in range(0, 24)]
    feature_minute = [int(i == int(current_time.minute / 5)) for i in range(0, 12)]
    device = Device.query.filter_by(id=device_id).first()
    last_12_data = [data.universal_mac_count for data in device.get_last_12_data()]
    X = pd.DataFrame(np.array(last_12_data + feature_weekday + feature_hour + feature_minute)).T
    try:
        mac_counts = [int(joblib.load('models/gbm_' + str(device_id) + '_' + str(i) + '_model.pkl').predict(X)[0])
                     for i in range(1, 13)]
    except:
        cache[device_id] = []
        last_cache_time[device_id] = time.time()
        return []
    res = [generate_crowdedness_from_universal_mac_count(device, mac) for mac in mac_counts]
    cache[device_id] = res
    last_cache_time[device_id] = time.time()
    return res