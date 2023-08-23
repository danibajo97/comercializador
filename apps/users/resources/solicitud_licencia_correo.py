import smtplib
from datetime import date
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.db import transaction
from django.template.loader import render_to_string

from apps.users.resources.authenticated_user import authenticated_user


@transaction.atomic()
def solicitud_licencia_correo(data, request):
    mailServer = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
    mailServer.starttls()
    mailServer.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    user = authenticated_user(request)
    for email in [data['cliente_final_correo'], user.email]:
        message = MIMEMultipart()
        message['From'] = settings.EMAIL_HOST_USER
        message['To'] = email
        message['Subject'] = 'Licencias de Softwares'

        content = render_to_string('solicitud_licencia/solicitud_licencia_correo.html', {
            'data': data,
            'fecha': date.today(),
        })

        message.attach(MIMEText(content, 'html'))
        mailServer.sendmail(settings.EMAIL_HOST_USER,
                                email,
                                message.as_string())
