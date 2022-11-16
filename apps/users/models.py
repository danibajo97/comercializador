from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from simple_history.models import HistoricalRecords


class UserManager(BaseUserManager):
    def _create_user(self, username, email, name, password, is_staff, is_superuser, **extra_fields):
        user = self.model(
            username=username,
            email=email,
            name=name,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, username, email, name, password=None, **extra_fields):
        return self._create_user(username, email, name, password, False, False, **extra_fields)

    def create_superuser(self, username, email, name, password=None, **extra_fields):
        return self._create_user(username, email, name, password, True, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Correo Electrónico', max_length=255)
    name = models.CharField('Nombre', max_length=255, blank=True, null=True)
    last_name = models.CharField('Apellido', max_length=255, blank=True, null=True)
    username = models.CharField('Usuario', max_length=255, unique=True,)
    id_erp = models.CharField('id-ERP', max_length=255)
    is_active = models.BooleanField(default=True)
    is_distribuidor = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_resetpwd = models.BooleanField(default=False)
    historical = HistoricalRecords()
    objects = UserManager()

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'last_name', 'email']

    def __str__(self):
        return f'{self.username}'
