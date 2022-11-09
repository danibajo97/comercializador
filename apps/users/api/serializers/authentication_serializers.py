from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.users.models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class ActivateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'name', 'last_name', 'email', 'password')
        extra_kwargs = {
            'name': {'required': True},
            'last_name': {'required': True},
        }

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "Este nombre de usuario ya está en uso."})
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

        return attrs

    def update(self, instance, validated_data):

        instance.first_name = validated_data['name']
        instance.last_name = validated_data['last_name']
        instance.username = validated_data['username']
        instance.set_password(validated_data['password'])
        instance.save()

        return instance
