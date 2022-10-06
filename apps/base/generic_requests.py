import requests
from apps.base.authenticated_versat import authenticated_versat
from comercializador.settings.base import VERSAT_ERP_URL


def get(url, params=None):
    full_url = '%s/%s' % (VERSAT_ERP_URL, url)
    response = requests.get(full_url, headers=authenticated_versat(), params=params)
    return response


def post(url, params=None, json=None):
    full_url = '%s/%s' % (VERSAT_ERP_URL, url)
    response = requests.post(full_url, headers=authenticated_versat(), params=params, json=json)
    return response


def put(url, params=None):
    full_url = '%s/%s' % (VERSAT_ERP_URL, url)
    response = requests.put(full_url, headers=authenticated_versat(), params=params)
    return response


def delete(url, params=None):
    full_url = '%s/%s' % (VERSAT_ERP_URL, url)
    response = requests.delete(full_url, headers=authenticated_versat(), params=params)
    return response
