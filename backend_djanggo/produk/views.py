from django.http import JsonResponse
from .models import Produk, Kategori, Status
from .services import get_fastprint_data
from rest_framework import viewsets
from .serializers import ProdukSerializer
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
     return render(request, 'home.html')

def sync_produk_logic():
    data = get_fastprint_data()

    for item in data['data']:
        kategori, _ = Kategori.objects.get_or_create(
            nama_kategori=item['kategori']
        )

        status, _ = Status.objects.get_or_create(
            nama_status=item['status']
        )

        Produk.objects.update_or_create(
            nama_produk=item['nama_produk'],
            defaults={
                'harga': item['harga'],
                'kategori': kategori,
                'status': status
            }
        )
    return JsonResponse({"message": "Data berhasil disimpan"})
    

class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.all()
    sync_produk_logic()
    serializer_class = ProdukSerializer

def sync_produk(request):
    sync_produk_logic()
    return JsonResponse({"message": "Data berhasil disimpan"})
    
def produk_bisa_dijual(request):
    data = Produk.objects.filter(status__nama_status__iexact="bisa dijual")
    result = []

    for p in data:
        result.append({
            "nama": p.nama_produk,
            "harga": p.harga,
            "kategori": p.kategori.nama_kategori,
            "status": p.status.nama_status
        })

    return JsonResponse(result, safe=False)



