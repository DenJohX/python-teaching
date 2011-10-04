from django.conf.urls.defaults import *

urlpatterns = patterns('chatroom.views',
    url(r'^$', 'index'),
    url(r'^send/$', 'send'),
    url(r'^poll/$', 'poll'),
)
