import requests
from comercializador.settings import VERSAT_ERP_URL


class ResponseBase(object):
    _instance = None
    __token = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ResponseBase, cls).__new__(cls)
        return cls._instance

    def setToken(self, token):
        self.__token = token

    def __getHeaders(self):
        return {'Authorization': 'Bearer %s' % self.__token}

    def __getURL(self, url):
        return '%s/%s' % (VERSAT_ERP_URL, url)

    def get(self, url, params=None):
        return requests.get(self.__getURL(url), headers=self.__getHeaders(), params=params, verify=False)

    def post(self, url, params=None, json=None):
        return requests.post(self.__getURL(url), headers=self.__getHeaders(), params=params, json=json, verify=False)

    def put(self, url, params=None, json=None):
        return requests.put(self.__getURL(url), headers=self.__getHeaders(), params=params, json=json, verify=False)

    def delete(self, url, params=None):
        return requests.delete(self.__getURL(url), headers=self.__getHeaders(), params=params, verify=False)
