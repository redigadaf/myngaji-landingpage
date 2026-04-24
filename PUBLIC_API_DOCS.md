# Dokumentasi Public API v1 - MyNgaji Academy

Selamat datang di Dokumentasi API Publik MyNgaji Academy. API ini disediakan untuk memungkinkan integrasi data MyNgaji ke proyek eksternal seperti Landing Page, Blog, atau Aplikasi Mobile pihak ketiga.

---

## 1. Dasar API (Base API)

- **Base URL**: `https://app.myngaji.com/api/public/v1` (Sesuaikan dengan domain production Anda)
- **Format Respons**: JSON
- **Autentikasi**: Static Token

### Autentikasi

Semua request wajib menyertakan token autentikasi di dalam Header.

**Opsi 1: Bearer Token (Direkomendasikan)**

```http
Authorization: Bearer <TOKEN_ANDA>
```

**Opsi 2: Custom Header**

```http
x-api-token: <TOKEN_ANDA>
```

> [!IMPORTANT]
> Token Anda saat ini adalah: `Request Token ke developer`

---

## 2. Rate Limiting (Had Had)

Untuk memastikan kestabilan sistem, kami menerapkan had (rate limit) berdasarkan alamat IP pengguna:

- **Endpoint Guru & Pakej**: Maksimum **60 request per jam**.
- **Endpoint Pendaftaran Trial**: Maksimum **1 pendaftaran setiap 3 jam**.

Jika anda melebihi had ini, API akan mengembalikan status code `429 Too Many Requests` bersama header `Retry-After`.

---

## 3. Daftar Endpoint

### A. Ambil Daftar Guru

Mendapatkan semua pengajar yang aktif di MyNgaji.

- **URL**: `/guru`
- **Method**: `GET`
- **Respons (200 OK)**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "full_name": "Cikgu Ahmad",
        "profile_image": "https://...",
        "display_role": "Guru Al-Quran & Tajwid",
        "experience": "5 Tahun",
        "bio": "Lulusan Universiti Al-Azhar..."
      }
    ]
  }
  ```

---

### B. Ambil Daftar Pakej

Mendapatkan semua paket pembelajaran yang tersedia dan aktif.

- **URL**: `/pakej`
- **Method**: `GET`
- **Respons (200 OK)**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "nama": "Kelas Mengaji Kanak Kanak",
        "level": "kanak-kanak",
        "gambar_cover": "https://...",
        "deskripsi": "Deskripsi lengkap paket..."
      }
    ]
  }
  ```

---

### C. Daftar Trial (Leads)

Mendaftarkan calon peserta baru untuk sesi trial.

- **URL**: `/leads/trial`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "nama": "Ahmad Dani",
    "phone_wa": "60123456789",
    "package_id": "uuid-pakej-yang-dipilih"
  }
  ```
- **Respons (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Pendaftaran berjaya",
    "lead_id": "uuid-lead"
  }
  ```

---

## 3. Contoh Implementasi (JavaScript/Next.js)

Berikut adalah contoh cara memanggil API MyNgaji menggunakan `fetch`:

```javascript
const API_URL = "https://app.myngaji.com/api/public/v1";
const API_TOKEN = "myngaji_stat_token_2024_public";

async function getTeachers() {
  const response = await fetch(`${API_URL}/guru`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Gagal mengambil data");

  const result = await response.json();
  return result.data;
}

// Contoh Pendaftaran Trial
async function registerTrial(name, phone, packageId) {
  const response = await fetch(`${API_URL}/leads/trial`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama: name,
      phone_wa: phone,
      package_id: packageId,
    }),
  });

  return await response.json();
}
```

---

## 4. Status Code

| Code | Keterangan                                |
| ---- | ----------------------------------------- |
| 200  | Berjaya (Success)                         |
| 400  | Input tidak sah (Bad Request)             |
| 401  | Token tidak sah atau tiada (Unauthorized) |
| 429  | Terlalu banyak permintaan (Rate Limited)  |
| 500  | Ralat pelayan (Internal Server Error)     |

---

_Dokumentasi ini dijana secara automatik untuk sistem MyNgaji Academy v1._
