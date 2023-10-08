import bcrypt
from django.contrib.auth import get_user_model

User = get_user_model()


class BcryptAuthBackend:
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if bcrypt.checkpw(password.encode('utf8'), user.password.encode('utf8')):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
