#/bin/bash
!(crontab -l | grep -q "$(pwd)/run.sh") && (crontab -l; echo "*/5 * * * * $(pwd)/run.sh") | crontab -
!(crontab -l | grep -q "$(pwd)/bootstrap.sh") && (crontab -l; echo "@roboot $(pwd)/bootstrap.sh") | crontab -