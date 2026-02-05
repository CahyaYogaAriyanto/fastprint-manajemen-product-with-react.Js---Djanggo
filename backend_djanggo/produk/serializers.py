from rest_framework import serializers
from .models import Produk, Kategori, Status


class ProdukSerializer(serializers.ModelSerializer):
    kategori_id = serializers.PrimaryKeyRelatedField(
        queryset=Kategori.objects.all(),
        source='kategori',
        write_only=True
    )
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=Status.objects.all(),
        source='status',
        write_only=True
    )

    kategori = serializers.CharField(
        source='kategori.nama_kategori',
        read_only=True
    )
    status = serializers.CharField(
        source='status.nama_status',
        read_only=True
    )

    class Meta:
        model = Produk
        fields = [
            'id_produk',
            'nama_produk',
            'harga',
            'kategori_id',
            'status_id',
            'kategori',
            'status',
        ]

    def create(self, validated_data):
        return Produk.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.nama_produk = validated_data.get('nama_produk', instance.nama_produk)
        instance.harga = validated_data.get('harga', instance.harga)
        instance.kategori = validated_data.get('kategori', instance.kategori)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
