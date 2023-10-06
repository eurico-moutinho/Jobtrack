from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
from django.db.models import Q
import bcrypt

# Create your views here.


@permission_classes([IsAuthenticated])
class UserView(APIView):

    def get(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(Q(email__iexact=email))

            hash_password = bcrypt.hashpw(
                password.encode('utf8'), bcrypt.gensalt(14))

            if bcrypt.checkpw(hash_password, user.password.encode('utf8')):

                serializer = UserSerializer(user, many=False)

                return Response({'data': serializer.data}, safe=False)

            else:

                return Response({'detail': 'Wrong Password!'}, status=status.HTTP_UNAUTHORIZED)

        except User.DoesNotExist:

            return Response({'detail': 'User doesn\'t exist'})

    def post(self, request):

        if User.objects.filter(Q(email__iexact=request.data['email'])).exists():
            return Response('User with this email already exists', status=400)

        user = User.objects.create(

            name=request.data['name'],
            email=request.data['email'],
            password=bcrypt.hashpw(
                request.data['password'].encode('utf8'), bcrypt.gensalt(14)),

        )

        serializer = UserSerializer(user)

        return Response({'data': serializer.data}, status=201)

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

        return JsonResponse('user deleted')


@permission_classes([IsAuthenticated])
class JobView(APIView):

    def get(self, request, id=None):

        if (id is None):

            try:

                jobs = Job.objects.filter(user=request.data['user'])
                serializer = JobSerializer(jobs, many=True)

                return Response(serializer.data)

            except Job.DoesNotExist:

                raise JsonResponse('No jobs added')

        else:

            try:

                job = Job.objects.get(id=id)
                serializer = JobSerializer(job, many=False)

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

        return JsonResponse('job deleted')
