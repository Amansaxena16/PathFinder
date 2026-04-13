from django.urls import path

from .views import (
    FeaturedResourceView,
    ResourceDetailView,
    ResourceDownloadView,
    ResourceListView,
    ResourceMetaView,
)

urlpatterns = [
    path("", ResourceListView.as_view(), name="resource-list"),
    path("meta/", ResourceMetaView.as_view(), name="resource-meta"),
    path("featured/", FeaturedResourceView.as_view(), name="resource-featured"),
    path("<slug:slug>/download/", ResourceDownloadView.as_view(), name="resource-download"),
    path("<slug:slug>/", ResourceDetailView.as_view(), name="resource-detail"),
]
