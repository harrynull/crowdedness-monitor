#/bin/bash
{
    . ./.env
    echo "[$(date)] Switching ${CARD} to monitor mode..." 
    ifconfig ${CARD} down
    iwconfig ${CARD} mode monitor
    ifconfig ${CARD} up
    echo "[$(date)] Done!"
} >> log 2>&1
