from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Job
from .serializers import UserSerializer, JobSerializer
import bcrypt

# Create your views here.

salt = bcrypt.gensalt(14)


def get_tokens_for_user(user):

    refresh = RefreshToken.for_user(user)

    return {

        'refresh': str(refresh),
        'access': str(refresh.access_token),

    }


@api_view(['POST'])
def login(request):

    email = request.data.get('email')
    password = request.data.get('password').encode('utf8')

    try:

        user = User.objects.get(Q(email__iexact=email))

        if bcrypt.checkpw(password, user.password.encode('utf8')):

            token = get_tokens_for_user(user)

            return Response({

                'detail': 'Login successful',
                'token': token,

            }, status=200)

        else:
            return Response({'detail': 'Wrong Email or Password!'}, status=401)

    except User.DoesNotExist:

        return Response({'detail': 'User not found'}, status=401)


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

    return Response({'detail': 'User Created'},status=201)


@permission_classes([IsAuthenticated])
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


@permission_classes([IsAuthenticated])
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

        user_id = request.data['userId']

        job = Job.objects.create(

            user=get_object_or_404(User, pk=user_id),
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
