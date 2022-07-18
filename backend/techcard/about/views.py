from django.views.generic.base import TemplateView
from django.shortcuts import render

from .forms import MessageForm


class AboutAuthorView(TemplateView):
    template_name = "about/about.html"

    def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            context['form'] = MessageForm()
            return context


class HowItWorkView(TemplateView):
    template_name = "about/how_it_work.html"


def send_message(request):
    # sending email
    return render(request, "about/message_send.html")
