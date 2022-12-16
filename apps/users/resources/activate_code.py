import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.db import transaction
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


@transaction.atomic()
def activate_code(user, request):
    current_site = get_current_site(request)
    mailServer = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
    mailServer.starttls()
    mailServer.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)

    email_to = user.email
    message = MIMEMultipart()
    message['From'] = settings.EMAIL_HOST_USER
    message['To'] = email_to
    message['Subject'] = 'Activación de la Cuenta'

    content = render_to_string('activate_code/account_verification_email.html', {
        'user': user,
        'domain': current_site,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': default_token_generator.make_token(user)
    })
    message.attach(MIMEText(content, 'html'))
    mailServer.sendmail(settings.EMAIL_HOST_USER,
                        email_to,
                        message.as_string())
