from django.urls import path
from django.conf.urls import url, include
from ui_route.views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^dashboard/$', dashboard),
    url(r'^nssi_topology/$', nssi_topology),
    url(r'^NSS_Instance/$', NSS_Instance),
    url(r'^service_mapping_plugin/$', service_mapping_plugin),
]

urlpatterns += staticfiles_urlpatterns()