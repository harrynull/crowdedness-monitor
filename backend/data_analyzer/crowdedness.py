from app.database import Device, Data


def generate_crowdedness(device: Device, data: Data):
    max_mac = int(device.get_parameter("max"))
    min_mac = int(device.get_parameter("min"))
    total = int(device.get_parameter("total"))
    cnt = int(device.get_parameter("cnt"))
    umac = int(data.universal_mac_count)

    if max_mac is None or umac > max_mac:
        max_mac = umac
        device.set_parameter("max", max_mac)
    if min_mac is None or umac < min_mac:
        min_mac = umac
        device.set_parameter("min", min_mac)
    if cnt is None:
        cnt = 1
    else:
        cnt += 1
    if total is None:
        total = umac
    else:
        total += umac
    device.set_parameter("cnt", cnt)
    device.set_parameter("total", total)

    return int((umac - min_mac) / (max_mac - min_mac) * 0.9 * 100)
