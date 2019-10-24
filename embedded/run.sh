#/bin/bash
filename="cap_$(date +%Y_%m_%d_%H_%M_%S)"
{
    . ./.env
    echo "[$(date)] Start monitoring with ${CARD} $filename"
    #tshark -l -Ini ${CARD} -w cap.pcap -a duration:${SCAN_TIME} || (echo "[$(date)] Failed. Exiting."; exit 1)
    tshark -l -Ini ${CARD} -o "gui.column.format:\"Source\",\"%us\",\"Destination\",\"%rd\"" -a duration:${SCAN_TIME} > $filename
    echo "[$(date)] Reporting $filename"
    python3 report.py -f $filename
    rm $filename
    echo "[$(date)] $filename Finished."
} >> log 2>&1