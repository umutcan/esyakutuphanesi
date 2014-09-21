from django.views import generic

from .models import Stuff


class HomeView(generic.ListView):
    model = Stuff
    template_name = "index.html"
