import requests

class ResponseBase:
    __instance = None
    token = None

    @staticmethod
    def getInstance(cls):
        if cls.__instance is None:
            cls.__instance = ResponseBase()
        return cls.__instance

    def setToken(self, token, refresh):
        self.token = token

    def getUrl(self):
        return 'http://172.0.0.1:8000'

    def get(self, url, params):
        url2 = '%s/%s' % (self.getUrl, url)
        response2 = requests.get(url2, headers={'Authorization': 'Bearer {}'.format(self.token)}, params=params)
