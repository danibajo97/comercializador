from django.db import models
from simple_history.models import HistoricalRecords

from apps.base.models import BaseModel


class ConvenioWeb(BaseModel):
    name = models.CharField('Nombre', max_length=255, blank=True, null=True)
    id_erp = models.CharField('id-ERP', max_length=255)
    historical = HistoricalRecords()

    class Meta:
        verbose_name = 'Convenio'
        verbose_name_plural = 'Convenios'

    def __str__(self):
        return self.name