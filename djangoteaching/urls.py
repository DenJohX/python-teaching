from django.conf.urls.defaults import patterns, include, url
from django.http import HttpResponseRedirect

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^$', lambda x: HttpResponseRedirect('/teaching/')),
   # Examples:
    url(r'^teaching/', include('teaching.urls')),
    url(r'^chatroom/', include('chatroom.urls')),
    # url(r'^djangoteaching/', include('djangoteaching.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    #Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
