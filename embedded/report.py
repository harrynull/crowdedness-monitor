import argparse
import requests
import os
from read_packet import read_packet

if "TOKEN" not in os.environ: exit("TOKEN is not set.")
TOKEN = os.environ["TOKEN"]
REPORT_ADDR = os.environ["REPORT_ADDR"]


parser = argparse.ArgumentParser(description='Scan nearby wifi devices')
parser.add_argument('-i', type=str, help='Specify interface')
parser.add_argument('-f', type=str, help='Read from files')
args = parser.parse_args()

pkg_count, mac_count, universal_mac_count = read_packet(args)

data = {'packet_count': pkg_count, 'mac_count': mac_count, 'universal_mac_count': universal_mac_count,
        'token': TOKEN}

ret = requests.post(REPORT_ADDR, data=data).json()
if not ret['success']:
    print("Report failed:", ret)