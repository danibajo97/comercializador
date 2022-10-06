import time

import requests
import schedule

from comercializador.settings.base import VERSAT_ERP_URL


def authenticated_versat():
    url = '%s/%s' % (VERSAT_ERP_URL, 'api/token/')
    params = {
        'username': 'implantadora',
        'password': 'A*123456.d',
    }
    response = requests.post(url, data=params)
    if response.status_code == 200:
        token = response.json()
        headers = {'Authorization': 'Bearer {}'.format(token['access'])}
    else:
        headers = None
    return headers


# Task scheduling
# After every 1mins authenticated_versat() is called.
schedule.every(10).minutes.do(authenticated_versat)

# Loop so that the scheduling task
# keeps on running all time.
while True:
    # Checks whether a scheduled task
    # is pending to run or not
    schedule.run_pending()
    time.sleep(1)
