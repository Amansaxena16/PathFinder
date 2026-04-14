from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "resource_type",
        "is_featured",
        "is_published",
        "updated_at",
    )
    list_filter = (
        "category",
        "resource_type",
        "is_featured",
        "is_published",
    )
    search_fields = ("title", "slug", "summary", "description")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (
            "Core",
            {
                "fields": (
                    "title",
                    "slug",
                    "summary",
                    "description",
                    "category",
                    "resource_type",
                    "read_time",
                    "tags",
                )
            },
        ),
        (
            "Media & Downloads",
            {
                "fields": ("download_file",),
            },
        ),
        (
            "Publishing",
            {"fields": ("is_featured", "is_published")},
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at")},
        ),
    )