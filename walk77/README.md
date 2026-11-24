# NARANTAKA WALK — V3.0

Aplikasi PWA open-source untuk menemani perjalanan jalan kaki dan kebiasaan sehat. Dibuat dengan HTML, CSS, dan JavaScript tanpa framework atau dependensi eksternal.

## Fitur V3.0
- Dashboard progres berat badan 87 kg menuju target 77 kg.
- Pencatatan langkah manual, air putih, dan durasi jalan kaki.
- **GPS Walk Session:** melacak jarak, durasi, dan pace menggunakan geolocation browser.
- **Experimental Step Counter:** estimasi langkah dari akselerometer `DeviceMotionEvent` pada perangkat/browser yang mendukung.
- Checklist kebiasaan harian dan kalender tantangan 30 hari.
- Riwayat berat badan.
- Reminder harian yang dapat diatur waktunya menggunakan Web Notifications.
- Ekspor dan impor cadangan JSON.
- Penyimpanan lokal melalui `localStorage`; data tidak dikirim ke server.
- Service worker untuk cache/offline setelah kunjungan pertama dan handler untuk event Web Push.
- Tema modern sport aesthetic: black / red neon.

## Menjalankan lokal
PWA, GPS, dan notifikasi browser memerlukan HTTPS atau `localhost`.

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser.

## Memasang di Android
1. Upload seluruh isi folder `walk77` ke repository GitHub.
2. Buka **Settings → Pages** pada repository.
3. Pilih **Deploy from a branch**, branch `main`, folder `/root`, lalu simpan.
4. Setelah GitHub Pages aktif, buka URL HTTPS dari Chrome Android.
5. Pilih menu ⋮ → **Install app** atau **Add to Home screen**.
6. Izinkan notifikasi dan lokasi ketika diminta.

## GPS dan penghitung langkah
- GPS membutuhkan koneksi HTTPS, izin lokasi, dan perangkat dengan GPS. Jarak dihitung dari titik lokasi yang diterima; akurasi dapat dipengaruhi gedung, cuaca, dan kualitas sinyal.
- Sesi GPS perlu tetap berjalan pada halaman aplikasi. Browser/Android dapat menangguhkan geolocation ketika aplikasi berada di background atau layar terkunci.
- Penghitung langkah menggunakan akselerometer melalui `DeviceMotionEvent`. Ini adalah **estimasi eksperimental**, bukan akses ke sensor pedometer hardware Android. Dukungan dan akurasinya berbeda antarperangkat. Aktifkan saat berjalan dan bawa HP di saku/pinggang. Sensor hanya menghitung ketika sesi GPS aktif.
- Jika sensor tidak tersedia atau hasilnya tidak akurat, gunakan tombol tambah langkah manual.

## Reminder dan Web Push
- Reminder terjadwal di aplikasi memeriksa waktu saat halaman/aplikasi berjalan. Browser dapat menunda timer di background; reminder lokal tidak dijamin muncul jika aplikasi/browser ditutup sepenuhnya.
- Service worker sudah memiliki handler event `push`, tetapi **pengiriman push saat aplikasi tertutup belum aktif**. Untuk mengaktifkannya dibutuhkan backend/layanan push, VAPID public/private key, endpoint penyimpanan subscription, serta proses penjadwalan di server. Jangan memasukkan private key ke repository atau kode frontend.

## Mengedit
- Tampilan: bagian `<style>` di `index.html`.
- Fitur dan logika: bagian `<script>` di `index.html`.
- Nama, ikon, dan warna instalasi: `manifest.webmanifest` dan folder `icons`.
- Cache offline dan notifikasi push: `sw.js`.

## Privasi
Data aktivitas dan berat disimpan di browser/perangkat menggunakan `localStorage`. Tidak ada akun, analytics, atau pengiriman data ke server dalam versi ini. Menghapus data browser dapat menghapus catatan; gunakan **Ekspor data** untuk membuat cadangan.

## Lisensi
MIT — bebas dipelajari, dimodifikasi, dan dikembangkan. Jika didistribusikan ulang, sertakan file lisensi.
