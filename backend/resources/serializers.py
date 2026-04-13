from typing import Optional

from django.urls import reverse
from rest_framework import serializers

from .models import Resource


class RelatedResourceSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = (
            "title",
            "slug",
            "summary",
            "category",
            "resource_type",
            "detail_url",
        )

    def get_detail_url(self, obj: Resource) -> Optional[str]:
        request = self.context.get("request")
        url = reverse("resources:resource-detail", kwargs={"slug": obj.slug})
        return request.build_absolute_uri(url) if request else url


class ResourceListSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    detail_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

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
            "content_template",
            "is_featured",
            "thumbnail_url",
            "detail_url",
            "download_url",
        )

    def get_thumbnail_url(self, obj: Resource) -> Optional[str]:
        if not obj.thumbnail:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url

    def get_detail_url(self, obj: Resource) -> Optional[str]:
        request = self.context.get("request")
        url = reverse("resources:resource-detail", kwargs={"slug": obj.slug})
        return request.build_absolute_uri(url) if request else url

    def get_download_url(self, obj: Resource) -> Optional[str]:
        if not obj.has_download:
            return None
        request = self.context.get("request")
        url = reverse("resources:resource-download", kwargs={"slug": obj.slug})
        return request.build_absolute_uri(url) if request else url


class ResourceDetailSerializer(ResourceListSerializer):
    related_resources = RelatedResourceSerializer(many=True, read_only=True)

    class Meta(ResourceListSerializer.Meta):
        fields = ResourceListSerializer.Meta.fields + (
            "overview",
            "sections",
            "key_points",
            "related_resources",
            "published_at",
        )
