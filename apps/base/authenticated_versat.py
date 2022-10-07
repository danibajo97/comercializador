import threading
import time
import requests
import schedule

from apps.base.response_base import ResponseBase
from comercializador.settings import VERSAT_ERP_URL


class AuthenticatedThread(threading.Thread):
    __minutes = 10

    def authenticated_versat(self):
        print('Iniciando conexion a %s/' % VERSAT_ERP_URL)

        url = '%s/%s' % (VERSAT_ERP_URL, 'api/token/')
        payload = {
            "username": "dalia",
            "password": "A*123456.a"
        }
        headers = {"Content-Type": "application/json"}

        try:
            response = requests.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                token = response.json()
                response_base = ResponseBase()
                response_base.setToken(token['access'])

                print('Autentificacion satisfactoria!!!')
            else:
                print('Error en la autentificacion, code: %s' %
                      response.status_code)
        except Exception as exception:
            print('Error en la autentificacion!!!', str(exception))

    def run(self):
        self.authenticated_versat()
        schedule.every(self.__minutes).minutes.do(self.authenticated_versat)
        while True:
            schedule.run_pending()
            time.sleep(self.__minutes * 1000)


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
