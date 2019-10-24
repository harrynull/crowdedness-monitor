#/bin/bash
{
    . ./.env
    echo "[$(date)] Start monitoring with ${CARD}"
    tshark -l -Ini ${CARD} -w cap.pcap -a duration:${SCAN_TIME} || (echo "[$(date)] Failed. Exiting."; exit 1)
    echo "[$(date)] Reporting"
    python3 report.py -f cap.pcap
    rm cap.pcap
    echo "[$(date)] Finished."
} >> log 2>&1