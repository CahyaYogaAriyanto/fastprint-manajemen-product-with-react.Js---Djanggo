from django import forms
from .models import Produk

class ProdukForm(forms.ModelForm):
    class Meta:
        model = Produk
        fields = '__all__'

    def clean_nama_produk(self):
        nama = self.cleaned_data.get('nama_produk')
        if not nama:
            raise forms.ValidationError("Nama produk wajib diisi")
        return nama

    def clean_harga(self):
        harga = self.cleaned_data.get('harga')
        if not isinstance(harga, int):
            raise forms.ValidationError("Harga harus berupa angka")
        return harga
