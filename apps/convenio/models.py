from django.db import models

from apps.base.models import BaseModel


class ConvenioWeb(BaseModel):
    no_convenio = models.CharField('Nombre', max_length=255, blank=True, null=True)
    id_convenio = models.CharField('id-convenio', max_length=255)

    class Meta:
        verbose_name = 'Convenio'
        verbose_name_plural = 'Convenios'

    def __str__(self):
        return self.name
