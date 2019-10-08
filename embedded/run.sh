#/bin/sh
tshark -l -Ini wlan1 -w cap.pcap -a duration:10
python3 report.py -f cap.pcap
rm cap.pcap