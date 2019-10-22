#/bin/bash
{
    . ./.env
    echo "[$(date)] Switching ${CARD} to monitor mode..." 
    ifconfig ${CARD} down
    iwconfig ${CARD} mode monitor
    ifconfig ${CARD} up
    echo "[$(date)] Sending ip $(hostname -I | awk '{print $1}') to the server..."
    curl -sS "${REPORT_ADDR}/data/ip?token=${TOKEN}&ip=$(hostname -I | awk '{print $1}')"
    echo "[$(date)] Done!"
} >> log 2>&1
