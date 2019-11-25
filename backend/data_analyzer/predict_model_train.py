import pandas as pd
import numpy as np
import requests
from datetime import datetime
from sklearn.feature_extraction import DictVectorizer
from sklearn import preprocessing
import lightgbm as lgb
from sklearn.externals import joblib

data = pd.DataFrame(requests.get("https://harrynull.tech/cm/data/export?key=wXw8U3QlS5iEoCh9").json()['data'])
data['datetime'] = data['time'].map(lambda x: datetime.fromtimestamp(x))
data['weekday'] = data['datetime'].map(lambda x: x.weekday())
data['hour'] = data['datetime'].map(lambda x: x.hour)


def vec_cat(data, name):
    x_vec_cat = DictVectorizer(sparse=False).fit_transform(data[[name]].fillna('NA').T.to_dict().values())
    enc = preprocessing.OneHotEncoder()
    enc.fit(x_vec_cat)
    return enc.transform(x_vec_cat).toarray()


def train(DC, feature_name, X_test, X_train):
    y = DC[feature_name]
    y = pd.DataFrame(y)
    y.index = range(len(y))
    y_train = y.iloc[0:4000]
    y_test = y.iloc[4000:]

    lgb_train = lgb.Dataset(X_train, y_train)
    lgb_eval = lgb.Dataset(X_test, y_test, reference=lgb_train)
    params1 = {
        'task': 'train',
        'boosting_type': 'gbdt',
        'objective': 'regression',
        'metric': {'l2', 'auc'},
        'num_leaves': 31,
        'learning_rate': 0.05,
        'feature_fraction': 0.9,
        'bagging_fraction': 0.8,
        'bagging_freq': 5,
        'verbose': 1
    }

    return lgb.train(params1, lgb_train, num_boost_round=4000, valid_sets=lgb_eval)


def train_for_device(data, device_id):
    DC = data[data['device'] == device_id]
    if len(DC) < 5000:
        return
    DC.index = range(len(DC))
    DC = DC.drop(['crowdedness', 'location', 'mac_count', 'packet_count', 'time', 'device'], axis=1)
    DC['minute'] = DC.index % 12

    for i in range(0, 12):
        DC['past_' + str(i)] = DC['universal_mac_count'].shift(i + 1)

    for i in range(0, 12):
        DC['future_' + str(i)] = DC['universal_mac_count'].shift(-(i + 1))

    DC = DC.dropna()
    X = DC.drop(['universal_mac_count', 'datetime', 'weekday', 'hour', 'minute',
                 'future_0', 'future_1', 'future_2', 'future_3', 'future_4', 'future_5',
                 'future_6', 'future_7', 'future_8', 'future_9', 'future_10'], axis=1)
    X = X.values
    X = np.concatenate((X, vec_cat(DC, 'weekday')), axis=1)
    X = np.concatenate((X, vec_cat(DC, 'hour')), axis=1)
    X = np.concatenate((X, vec_cat(DC, 'minute')), axis=1)
    X = pd.DataFrame(X)
    X_train = X.iloc[0:4000]
    X_test = X.iloc[4000:]

    gbm = train(DC, 'universal_mac_count', X_test, X_train)
    joblib.dump(gbm, 'gbm_' + str(device_id) + '_0_model.pkl')
    for i in range(0, 11):
        print('Start training...')
        gbm = train(DC, 'future_' + str(i), X_test, X_train)
        print("best_score:", gbm.best_score)
        joblib.dump(gbm, 'gbm_' + str(device_id) + '_' + str(i + 2) + '_model.pkl')


for i in range(1, data['device'].max() + 1):
    train_for_device(data, i)

"""
model = joblib.load('gbm1_model.pkl')
model.predict
"""
