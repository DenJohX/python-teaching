from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
#from django.core import serializers
from django.utils import simplejson
from teaching.models import TeachingConsole
from datetime import datetime
from time import sleep, mktime

def teaching(request):
    if 'd' in request.POST:
        last_date = int(request.POST['d'])
    else:
        return HttpResponseNotFound('');

    max_tries = 10
    tries = 0
    n_entries = 0
    last_d = datetime.fromtimestamp(last_date)

    while (n_entries < 1  and tries < max_tries):
        latest_console_entries = TeachingConsole.objects.filter(pub_date__gt=last_d).order_by('pub_date')
        n_entries = len(latest_console_entries)
        sleep(0.5)
        tries+=1

    response_list = []
    for command in latest_console_entries:
        response_list.append({'txt':command.text,
            'date':int(mktime(command.pub_date.timetuple())) })
    #return render(request, 'list.html', {'consoles':latest_console_entries,
    #    'json' : serializers.serialize('json', latest_console_entries) })
    return HttpResponse(simplejson.dumps(response_list), mimetype='application/json')

def index(request):
    return render(request, 'index.html')

def send_console(request):
    try:
        text = request.POST['text']
    except:
        pass
    else:
        n = TeachingConsole(text=text, pub_date=datetime.now())
        n.save();

    return render(request, 'send.html')

