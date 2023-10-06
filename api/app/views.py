from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
from django.db.models import Q
import bcrypt
import requests

# Create your views here.


@permission_classes([IsAuthenticated])
class User(APIView):

    def get(self, request):

        try:
            user = User.objects.get(email=request.data['email'])
            if bcrypt.checkpw(request.data(['password']).encode('utf8'), user.password.encode('utf8')):

                serializer = UserSerializer(user, many=False)

                return Response(serializer.data)

            else:

                return JsonResponse('Wrong Password!')

        except User.DoesNotExist:

            raise JsonResponse('User doesn\'t exist')

    def post(self, request):

        user = User.objects.create(

            name=request.data['name'],
            email=request.data['email'],
            password=bcrypt.hashpw(
                request.data['password'].encode('utf8'), bcrypt.gensalt(14)),

        )

        serializer = UserSerializer(user)

        return Response(serializer.data)

    def put(self, request):

        user = self.get_object(request.data['email'])
        user.name = request.data['name']
        newEmail = request.data['newEmail']

        if (User.objects.filter(email=newEmail).exists()):

            return JsonResponse('email already exists')

        else:

            user.email = newEmail

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)

    def delete(self, request):

        user = self.get_object(request.data['email'])
        user.delete()

        return JsonResponse('user deleted')


@permission_classes([IsAuthenticated])
class Job(APIView):

    def get(self, request, id=None):

        if (id is None):

            try:

                jobs = Job.objects.get(user=request.data['user'])
                serializer = JobSerializer(jobs, many=True)

                return Response(serializer.data)

            except Job.DoesNotExist:

                raise JsonResponse('No jobs added')

        else:

            try:

                job = Job.objects.get(id=id)
                serializer = JobSerializer(job, many=True)

                return Response(serializer.data)

            except Job.DoesNotExist:

                raise JsonResponse('No job found')

    def post(self, request):

        job = Job.objects.create(

            user=request.data['userId'],
            company=request.data['company'],
            title=request.data['title'],
            description=request.data['description'],
            dateapplied=request.data['dateapplied'],
            urllink=request.data['urllink'],

        )

        serializer = UserSerializer(job)

        return Response(serializer.data)

    def put(self, request, id):

        job = self.get_object(id)
        job.company = request.data['company']
        job.title = request.data['title']
        job.description = request.data['description']
        job.dateapplied = request.data['dateapplied']
        job.urllink = request.data['urllink']

        serializer = UserSerializer(job, many=False)

        return Response(serializer.data)

    def delete(self, request, id):

        user = self.get_object(id)
        user.delete()

        return JsonResponse('job deleted')
