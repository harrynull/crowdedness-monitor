from app.database import Device, Data


def generate_crowdedness(device: Device, data: Data):
    max_mac = device.get_parameter("max")
    min_mac = device.get_parameter("min")
    umac = int(data.universal_mac_count)

    if max_mac is None:
        max_mac = umac
    if min_mac is None:
        min_mac = umac

    return int(min(int((umac - min_mac) / (max_mac - min_mac + 1) * 100), 100))
