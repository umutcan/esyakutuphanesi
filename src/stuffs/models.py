# -*- coding: utf-8 -*-
from django.db import models


class Stuff(models.Model):
    name = models.CharField("Eşya İsmi", max_length=128)
    detail = models.TextField("Ayrıntı", max_length=9182)
    created_at = models.DateTimeField("Oluşturulma Tarihi", auto_now_add=True)

    class Meta:
        verbose_name = u'Eşya'
        verbose_name_plural = u'Eşyalar'
        ordering = ['-created_at']

    def __unicode__(self):
        return self.name
