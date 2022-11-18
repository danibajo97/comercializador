# Generated by Django 4.1 on 2022-11-16 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_historicaluser_username_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicaluser',
            name='email',
            field=models.EmailField(max_length=255, verbose_name='Correo Electrónico'),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=255, verbose_name='Correo Electrónico'),
        ),
    ]
