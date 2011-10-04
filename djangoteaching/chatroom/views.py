from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.utils import simplejson
from time import sleep, time, mktime
from random import random
from chatroom.models import chatroomMessages
from datetime import datetime

def index(request):
    return render(request,'chatroom.html')

def send(request):
    if ('txt' in request.POST and 'a' in request.POST):
        newMsg = chatroomMessages(text=request.POST['txt'],author=request.POST['a'])
        newMsg.save()
        response = simplejson.dumps({'success':True})
    else:
        return HttpResponseNotFound()
    return HttpResponse(response, mimetype='application/json')

def poll(request):
    try:
        min_date = int(request.POST['d'])
    except:
        return HttpResponseNotFound()

    messages = []
    tries = 0
    max_tries = 10

    #while (len(messages) < 1 and tries < max_tries):
    #    chatroomMessages.objects.update()
    #    messages = chatroomMessages.objects.filter(pub_date__gt=datetime.fromtimestamp(min_date)).order_by('pub_date')
    #    sleep(0.3)
    #    tries += 1

    messages = chatroomMessages.objects.filter(pub_date__gt=datetime.fromtimestamp(min_date)).order_by('pub_date')

    result = []
    for message in messages:
        date = int(mktime(message.pub_date.timetuple()))
        result.append({'d':date, 'a':message.author, 'txt':message.text})
    response = simplejson.dumps(result)
    return HttpResponse(response, mimetype='application/json')

