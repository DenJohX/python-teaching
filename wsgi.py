# imports
import os
import sys

# Sets the path for WSGI to read the Django app properly
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__),'djangoteaching')))

# "djangoproj" should be the subdirectory within your root where the Django project's root is.
os.environ['DJANGO_SETTINGS_MODULE'] = 'djangoteaching.settings'

# another import--should really be at the top, but whatever
import django.core.handlers.wsgi

djangoapplication = django.core.handlers.wsgi.WSGIHandler()

# DotCloud WSGI stack sets the SCRIPT_NAME variable in the WSGI environment. This variable is required by some frameworks, but it confuses Django. Therefore, our wsgi.py wrapper unsets the variable to avoid unwanted side effects.
def application(environ, start_response):
	if 'SCRIPT_NAME' in environ:
		del environ['SCRIPT_NAME']
		return djangoapplication(environ, start_response)
