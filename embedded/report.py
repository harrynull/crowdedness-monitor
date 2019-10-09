import argparse
import requests
import os
from read_packet import read_packet

if "TOKEN" not in os.environ: exit("TOKEN is not set.")
TOKEN = os.environ["TOKEN"]

parser = argparse.ArgumentParser(description='Scan nearby wifi devices')
parser.add_argument('-i', type=str, help='Specify interface')
parser.add_argument('-f', type=str, help='Read from files')
args = parser.parse_args()

pkg_count, mac_count, universal_count = read_packet(args)

data = {"packet_count": pkg_count, "unique_mac": mac_count, "universal_mac": universal_count}
print(data)