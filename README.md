# Aplikasi Web untuk Manajemen Tugas Mahasiswa
### Project UTS - Perancangan dan Pemrogram Web II
### Stephanie - 03081220016
Aplikasi web sederhana untuk membantu mahasiswa dalam mengelola tugas.

### Spesifikasi:
- Database      : MySQL
- BackEnd       : Node.js dengan Express.js sebagai framework
- Frontend      : HTML, CSS, JavaScript, Bootstrap

### Cara Mengatur Database:
1. Install & Jalankan XAMPP (Jika Belum Ada)
   - Download & Install XAMPP melalui https://www.apachefriends.org/
   - Buka XAMPP Control Panel, lalu tekan Start pada module Apache dan MySQL
2. Import Database
   - Buka phpMyAdmin melalui browser dan ketik http://localhost/phpmyadmin/
   - Buat database baru, dengan cara:
     - Klik New, lalu pilih Databases
     - Isi Database name dengan "manajemen-tugas", kemudian tekan Create
   - Pilih database yang baru dibuat, lalu klik Import
   - Masukkan file: manajemen-tugas.sql
   - Klik Import

### Cara Menjalankan Web secara Lokal
1. Install git (Jika Belum Ada) 
   - Download dan Install git melalui https://git-scm.com/downloads
2. Clone Repository dari Github
   - Buka Command Prompt (cmd), PowerShell, atau Terminal
   - Jalankan perintah berikut untuk mengunduh kode sumber:
     - git clone https://github.com/StephanieWgs/manajemen-tugas.git
     - Pastikan clone di folder yang diinginkan
3. Install Visual Studio Code (Jika Belum Ada)
   - Download dan Install Visual Studio Code melalui https://code.visualstudio.com/download
4. Install Node.js (Jika Belum Ada)
   - Download dan Install Node.js melalui https://nodejs.org/
   - Pastikan Node.js terinstal dengan mengecek versinya melalui terminal:
     - node -v
   - Jika muncul versi Node.js, berarti instalasi berhasil.
5. Jalankan Web
   - Buka Visual Studio Code
   - Buka folder proyek yang telah di-clone, dengan cara:
     - File -> Open Folder -> Pilih Folder Proyek 
       , atau dengan cara
     - Drag & Drop Folder Proyek ke Visual Studio Code
   - Buka terminal di VSC, dengan cara:
     - Klik Shift + `
       , atau dengan cara
     - Klik View -> Terminal
   - Ketik "node server.js" atau "npm start" untuk menjalankan kode program
   - Buka aplikasi di browser dan ketik http://localhost:3000/

### Fitur Utama:
1. Pengguna dapat mendaftar (register), login, dan logout dengan sistem autentikasi berbasis JSON Web Token (JWT)
2. Pengguna dapat menambahkan, mengedit, dan menghapus tugas
3. Pengguna bisa memfilter tugas berdasarkan kategori tanpa perlu reload halaman
4. Sistem akan mengirimkan notifikasi secara real-time jika tugas ditambahkan, di-update, dan di-delete
5. Sistem akan melakukan validasi data dan mengirimkan notifikasi jika data tidak sesuai 
6. Sistem menggunakan tampilan antarmuka yang responsif