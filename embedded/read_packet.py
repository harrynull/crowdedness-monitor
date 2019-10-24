def is_local_administered(mac):
    return bool(int(mac[1],16)& 0b10)

def read_packet(args):
    if not args.f:
        print("No file is provided. Specify one with -f.")
        exit()
    
    mac_set = set()
    pkg_count = 0
    with open(args.f, encoding="utf8") as file:
        for packet_line in file:
            pkg_count += 1
            mac_addresses = packet_line.split(' → ')
            for mac in mac_addresses:
                if len(mac)<17: continue
                mac_set.add(mac[:17])

    universal = len([mac for mac in mac_set if not is_local_administered(mac)])
    return (pkg_count, len(mac_set), universal)