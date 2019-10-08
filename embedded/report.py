import pyshark
import argparse

parser = argparse.ArgumentParser(description='Scan nearby wifi devices')
parser.add_argument('-i', type=str, help='Specify interface')
parser.add_argument('-f', type=str, help='Read from files')
args = parser.parse_args()

def is_local_administered(mac):
    return bool(int(mac[1],16)& 0b10)

if args.f:
    cap = pyshark.FileCapture(args.f)
elif args.i:
    print("Collecting")
    cap = pyshark.LiveCapture(interface=args.i)
    cap.sniff(timeout=15)
else:
    print("Specify either -i or -f.")
    exit()
    
mac_set = set()
pkg_count = 0
for packet in cap:
    pkg_count += 1
    wlan = packet["WLAN"]
    if wlan.fc_type_subtype == "29":
        print("[*] Ignore ACK") # ACK
        continue
    if not hasattr(wlan, 'ta'):
        print("[*] Package does not have ta", packet["WLAN"])
        continue
    mac = wlan.ta
    seq = wlan.seq if hasattr(wlan, 'seq') else -1
    print(seq, mac)
    mac_set.add(mac)
    
#print(mac_set)
universal = len([mac for mac in mac_set if not is_local_administered(mac)])
print("%d packets collected"%pkg_count)
print("Unique MAC devices: {} ({} universal)".format(len(mac_set),universal))
