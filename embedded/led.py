#!/usr/bin/python
from luma.core.interface.serial import spi, noop
from luma.core.render import canvas
from luma.led_matrix.device import max7219
from luma.core.legacy import text, show_message
from luma.core.legacy.font import proportional, CP437_FONT, TINY_FONT, SINCLAIR_FONT, LCD_FONT
import requests
import time

def print_str(s, device):
    with canvas(device) as draw:
        device.contrast(8)
        text(draw, (0,0), s, fill="white", font=proportional(LCD_FONT))
def scroll_str(s, device, scroll_delay=0.03):
    with canvas(device) as draw:
        device.contrast(8)
        show_message(device, s, fill="white", font=proportional(LCD_FONT), scroll_delay=scroll_delay)

serial = spi(port=0, device=0, gpio=noop())
device = max7219(serial, cascaded=4, block_orientation=-90)

from subprocess import check_output
ip="IP Address: " + check_output(['hostname', '-I'])
scroll_str(ip, device, 0.1)

ad = "Real-time busyness of buildings:"
ad2 = "Also available at cm.harrynull.tech"
while True:
    print('Fetching data...')
    current_data = ["{}{:>3}%".format(d['abbr'],d['devices'][0]['crowdedness']) for d in requests.get("https://harrynull.tech/cm/data/current").json()['data']]
    print('Displaying...')
    scroll_str(ad, device)
    time.sleep(0.5)
    for d in current_data:
        print_str(d, device)
        time.sleep(2)
    scroll_str(ad2, device)
    time.sleep(0.5)
