import threading
import time
import requests

from apps.base.response_base import ResponseBase
from comercializador.settings import VERSAT_ERP_URL, VERSAT_ERP_TIME_AUTHENTICATED, VERSAT_ERP_USERNAME, VERSAT_ERP_PASSWORD


class AuthenticatedThread(threading.Thread):

    def authenticated_versat(self):
        print('Starting Connection to %s/' % VERSAT_ERP_URL)

        url = '%s/%s' % (VERSAT_ERP_URL, 'api/token/')
        payload = {
            "username": VERSAT_ERP_USERNAME,
            "password": VERSAT_ERP_PASSWORD
        }
        headers = {"Content-Type": "application/json"}

        try:
            response = requests.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                token = response.json()
                response_base = ResponseBase()
                response_base.setToken(token['access'])

                print('Successful Authentication!!!')
            else:
                print('Authentication Error, Code: %s' % response.status_code)
        except Exception as exception:
            print('Authentication Error!!!', str(exception))

    def run(self):
        while True:
            self.authenticated_versat()
            time.sleep(VERSAT_ERP_TIME_AUTHENTICATED * 1000)


class AuthenticatedVersat(object):
    _instance = None
    __run = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AuthenticatedVersat, cls).__new__(cls)
        return cls._instance

    def initial(self):
        if not self.__run:
            self.__run = True
            print('Creating Versat Authentication...')
            thread = AuthenticatedThread()
            thread.start()
