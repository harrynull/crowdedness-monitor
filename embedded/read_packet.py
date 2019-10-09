import pyshark

def is_local_administered(mac):
    return bool(int(mac[1],16)& 0b10)

def read_packet(args):
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
            #print("[*] Ignore ACK") # ACK
            continue
        if not hasattr(wlan, 'ta'):
            #print("[*] Package does not have ta", packet["WLAN"])
            continue
        mac = wlan.ta
        seq = wlan.seq if hasattr(wlan, 'seq') else -1
        #print(seq, mac)
        mac_set.add(mac)

    universal = len([mac for mac in mac_set if not is_local_administered(mac)])
    return (pkg_count, len(mac_set), universal)