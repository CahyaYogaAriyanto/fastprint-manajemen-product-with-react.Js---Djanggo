from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProdukViewSet, sync_produk, produk_bisa_dijual,home

router = DefaultRouter()
router.register(r'api', ProdukViewSet, basename='/')

urlpatterns = [
    path('', home),
    path('sync/', sync_produk, name='sync-produk'),
    path('bisa-dijual/', produk_bisa_dijual, name='produk-bisa-dijual'),
]

urlpatterns += router.urls


