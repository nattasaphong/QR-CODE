# QR Link Generator

เว็บแอปขนาดเล็กสำหรับสร้าง QR Code จากลิงก์ที่ผู้ใช้กรอก

## ใช้งานท้องถิ่น
1. คัดลอกไฟล์ `index.html`, `style.css`, `script.js` ลงในโฟลเดอร์ `qr-link-generator`
2. เปิด `index.html` ในเว็บเบราว์เซอร์

## ตั้งค่าเป็น Git repository และอัปขึ้น GitHub
สมมติชื่อ repo: `qr-link-generator`

```bash
cd path/to/qr-link-generator
git init
git add .
git commit -m "Initial commit - QR Link Generator"
# เปลี่ยน URL ตรง <YOUR_GITHUB_REPO_URL> เป็น URL ของรีโมทที่คุณสร้างบน GitHub
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
