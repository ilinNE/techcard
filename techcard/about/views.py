from django.views.generic.base import TemplateView


class AboutAuthorView(TemplateView):
    template_name = 'about/author.html'


class HowItWorkView(TemplateView):
    template_name = 'about/how_it_work.html'