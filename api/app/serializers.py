from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import User, Job


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'name', 'email']


class JobSerializer(ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'
