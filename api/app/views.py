from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
import bcrypt

# Create your views here.

salt = bcrypt.gensalt(14)


@api_view(['POST'])
def login(request):

    email = request.POST.get('email')
    password = request.POST.get('password').encode('utf8')

    user = authenticate(request, username=email, password=password)

    if user is not None:

        login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        return Response({'detail': 'Login successful', 'token': token.key}, status=200)

    else:

        return Response({'detail': 'Wrong Email or Password!'}, status=401)


@api_view(['POST'])
@login_required(login_url='login')
def logout_view(request):
    logout(request)
    return Response({'detail': 'Logout successful'})


@api_view(['POST'])
def register(request):

    if User.objects.filter(Q(email__iexact=request.data['email'])).exists():
        return Response('User with this email already exists', status=400)

    pwhash = bcrypt.hashpw(
        request.data['password'].encode('utf8'), salt)

    User.objects.create(

        name=request.data['name'],
        email=request.data['email'],
        password=pwhash.decode('utf8'),

    )

    return Response(status=201)


@login_required(login_url='login')
class UserView(APIView):

    def get(self, request):

        email = request.data.get('email')
        user = User.objects.get(Q(email__iexact=email))

        serializer = UserSerializer(user, many=False)

        return Response({'data': serializer.data})

    def put(self, request):

        user = User.objects.get(Q(email__iexact=request.data['email']))
        user.name = request.data['name']
        newEmail = request.data['newEmail']

        if (User.objects.filter(email=newEmail).exists()):

            return JsonResponse('email already exists')

        else:

            user.email = newEmail

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)

    def delete(self, request):

        user = User.objects.get(email=request.data['email'])
        user.delete()

        return Response('user deleted')


@login_required(login_url='login')
class JobView(APIView):

    def get(self, request, id=None):

        if (id is None):

            try:

                jobs = Job.objects.filter(user=request.data['user'])
                serializer = JobSerializer(jobs, many=True)

                return Response(serializer.data)

            except Job.DoesNotExist:

                return Response('No jobs added')

        else:

            try:

                job = Job.objects.get(id=id)
                serializer = JobSerializer(job, many=False)

                return Response(serializer.data)

            except Job.DoesNotExist:

                return Response('No job found')

    def post(self, request):

        job = Job.objects.create(

            user=request.data['userId'],
            company=request.data['company'],
            title=request.data['title'],
            description=request.data['description'],
            dateapplied=request.data['dateapplied'],
            urllink=request.data['urllink'],

        )

        serializer = JobSerializer(job)

        return Response(serializer.data)

    def put(self, request, id):

        job = self.get_object(id)
        job.company = request.data['company']
        job.title = request.data['title']
        job.description = request.data['description']
        job.dateapplied = request.data['dateapplied']
        job.urllink = request.data['urllink']

        serializer = JobSerializer(job, many=False)

        return Response(serializer.data)

    def delete(self, request, id):

        user = self.get_object(id)
        user.delete()

        return Response('job deleted')
