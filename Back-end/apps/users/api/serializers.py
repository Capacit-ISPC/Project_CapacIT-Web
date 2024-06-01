from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
    
    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        updated_user = super().update(instance, validated_data)
        updated_user.set_password(validated_data['password'])
        updated_user.save()
        return updated_user

class CustomUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'last_name', 'is_staff', 'is_active']

    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'email': instance['email'],
            'name': instance['name'],
            'last_name': instance['last_name'],
            'password': instance['password'],
            'is_staff': instance['is_staff'],
            'is_active': instance['is_active'],
        }

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class CustomUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'last_name', 'password',)

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        updated_user = super().update(instance, validated_data)
        updated_user.set_password(validated_data['password'])
        updated_user.save()
        return updated_user
    
class CurstomUserCartSerialier(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'last_name']   

class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    model = CustomUser
    email = serializers.EmailField(required=True)