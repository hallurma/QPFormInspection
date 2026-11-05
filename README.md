# Tauri + Vanilla

This template should help get you started developing with Tauri in vanilla HTML, CSS and Javascript.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## PWA dan GitHub Pages

Versi web/PWA berada di `src` dan dapat diterbitkan sebagai situs statis GitHub Pages.
Workflow `.github/workflows/pages.yml` menerbitkan isi folder `src` setiap kali ada push
ke branch `main`, atau saat workflow dijalankan manual.

Untuk mengaktifkan:

1. Hubungkan project ini ke repository GitHub dan push branch `main`.
2. Pada repository, buka **Settings → Pages** dan pilih **GitHub Actions** sebagai sumber deploy.
3. Tunggu workflow **Deploy PWA to GitHub Pages** selesai; URL Pages akan ditampilkan di hasil workflow.
4. Buka URL melalui HTTPS di ponsel. Android dapat memasang dari menu browser; di iPhone/iPad gunakan **Share → Add to Home Screen**.

HTML, JavaScript, dan aset aplikasi di GitHub Pages dapat diakses publik jika repository/situsnya publik.
Foto dan file Excel yang dipilih/dibuat aplikasi tetap diproses di perangkat; service worker hanya
menyimpan shell aplikasi dan aset statis untuk penggunaan offline. Draft yang disimpan aplikasi
tetap berada di penyimpanan lokal browser perangkat.
