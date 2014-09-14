from django.contrib import admin
from django.forms import ModelForm

from .models import Stuff

from suit_redactor.widgets import RedactorWidget


class StuffForm(ModelForm):
    class Meta:
        widgets = {
            'detail': RedactorWidget(),
        }


class StuffAdmin(admin.ModelAdmin):
    form = StuffForm

admin.site.register(Stuff, StuffAdmin)
