#from faker import Faker
#fake = Faker()

import random


def generate_username():
    # return fake.first_name() + fake.last_name() + str(random.randint(1000, 9999))
    return 'usertemp' + str(random.randint(1000, 9999))
