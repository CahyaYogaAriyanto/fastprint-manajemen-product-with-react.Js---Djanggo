from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Produk
from .serializers import ProdukSerializer

@api_view(["GET"])
def produk_bisa_dijual(request):
    produk = Produk.objects.filter(status__nama_status="bisa dijual")
    serializer = ProdukSerializer(produk, many=True)
    return Response(serializer.data)
