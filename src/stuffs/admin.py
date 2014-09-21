from django.contrib import admin
from django.forms import ModelForm

from .models import Category, Stuff, StuffPhoto

from suit_redactor.widgets import RedactorWidget


class StuffPhotoInline(admin.TabularInline):
    model = StuffPhoto
    extra = 3


class StuffForm(ModelForm):
    class Meta:
        widgets = {
            'detail': RedactorWidget(),
        }


class StuffAdmin(admin.ModelAdmin):
    form = StuffForm
    list_display = ("name", "category", "created_at")

    inlines = [StuffPhotoInline, ]

admin.site.register(Category)
admin.site.register(Stuff, StuffAdmin)
