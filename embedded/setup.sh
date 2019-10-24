#/bin/bash
!(crontab -l | grep -q "cd $(pwd) && ./run.sh") && (crontab -l; echo "*/5 * * * * cd $(pwd) && ./run.sh") | crontab -
!(crontab -l | grep -q "cd $(pwd) && sudo ./bootstrap.sh") && (crontab -l; echo "@roboot cd $(pwd) && sudo ./bootstrap.sh") | crontab -