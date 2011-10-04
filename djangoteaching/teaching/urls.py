from django.conf.urls.defaults import *

urlpatterns = patterns('',
    url(r'^$', 'teaching.views.index'),
    url(r'^teaching/', 'teaching.views.teaching'),
    url(r'^send/$', 'teaching.views.send_console'),
)
