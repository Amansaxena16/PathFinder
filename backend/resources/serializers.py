from typing import Optional
from django.urls import reverse
from rest_framework import serializers
from .models import AdminUser
from django.contrib.auth.hashers import check_password
from .models import Resource

class AdminSignupSerializer(serializers.ModelSerializer):
    re_enter_password = serializers.CharField(write_only=True)

    class Meta:
        model = AdminUser
        fields = ["email", "password", "re_enter_password"]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):

        if data["password"] != data["re_enter_password"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match"}
            )

        return data

    def create(self, validated_data):
        validated_data.pop("re_enter_password")
        return AdminUser.objects.create(**validated_data)


class AdminLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):

        try:
            user = AdminUser.objects.get(email=data["email"])

        except AdminUser.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Admin not found"}
            )

        if not check_password(data["password"], user.password):
            raise serializers.ValidationError(
                {"password": "Incorrect password"}
            )

        data["user"] = user
        return data
 
#  This serializer used for: library page, admin table, resource cards
class ResourceListSerializer(serializers.ModelSerializer):

    detail_url = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = (

            "id",
            "title",
            "slug",
            "summary",
            "description",
            "category",
            "resource_type",
            "read_time",
            "tags",
            "is_featured",
            "is_published",
            "detail_url",
        )


    def get_detail_url(self, obj: Resource) -> Optional[str]:
        request = self.context.get("request")
        url = reverse("resources:resource-detail", kwargs={"slug": obj.slug})
        return request.build_absolute_uri(url) if request else url

 
#  This serializer used for: detail page
class ResourceDetailSerializer(ResourceListSerializer):
    class Meta(ResourceListSerializer.Meta):
        fields = ResourceListSerializer.Meta.fields + (
            "created_at",
            "updated_at",
        )
        
#  This serializer used for: admin panel form
class ResourceWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = (
            "title",
            "slug",
            "summary",
            "description",
            "category",
            "resource_type",
            "read_time",
            "tags",
            "is_featured",
            "is_published",
        )