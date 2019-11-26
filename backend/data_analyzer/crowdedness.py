from app.database import Device, Data


def generate_crowdedness_from_universal_mac_count(device: Device, mac_count: int):
    max_mac = device.get_parameter("max")
    min_mac = device.get_parameter("min")
    umac = mac_count

    if max_mac is None:
        max_mac = umac
    if min_mac is None:
        min_mac = umac

    return int(max(min(int((umac - min_mac) / (max_mac - min_mac + 1) * 100), 100),0))


def generate_crowdedness(device: Device, data: Data):
    return generate_crowdedness_from_universal_mac_count(device, int(data.universal_mac_count))
