# -*- coding: utf-8 -*-
from django.db import models


class Category(models.Model):
    name = models.CharField("Eşya İsmi", max_length=128)
    image = models.ImageField("Görsel", upload_to="category_images")

    class Meta:
        verbose_name = u'Kategori'
        verbose_name_plural = u'Kategoriler'
        ordering = ['name']

    def __unicode__(self):
        return self.name


class Stuff(models.Model):
    name = models.CharField("Eşya İsmi", max_length=128)
    category = models.ForeignKey(Category, verbose_name='Kategori')
    detail = models.TextField("Ayrıntı", max_length=9182)
    created_at = models.DateTimeField("Oluşturulma Tarihi", auto_now_add=True)

    class Meta:
        verbose_name = u'Eşya'
        verbose_name_plural = u'Eşyalar'
        ordering = ['-created_at']

    def __unicode__(self):
        return self.name


class StuffPhoto(models.Model):
    image = models.ImageField("Eşya Fotoğrafı", upload_to="stuff_photos")
    stuff = models.ForeignKey(Stuff, related_name='photos')
