// Notifikasi Real-time jika tugas baru ditambahkan
const socket = new WebSocket(`ws://localhost:3000/`);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  showToast(data.message);
};

// Fungsi untuk menampilkan notifikasi (toast)
function showToast(message) {
  const toastBody = document.getElementById("toast-body");
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(document.getElementById("toast"));
  toast.show();
}
