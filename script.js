// script.js
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlInput');
  const generateBtn = document.getElementById('generateBtn');
  const qrArea = document.getElementById('qrArea');
  const downloadBtn = document.getElementById('downloadBtn');
  const clearBtn = document.getElementById('clearBtn');

  let qr; // instance ของ QRCode

  function createQRCode(text) {
    // ล้างของเดิมก่อน
    qrArea.innerHTML = '';

    // สร้าง element สำหรับ QR
    const wrapper = document.createElement('div');
    wrapper.id = 'qrcode';
    qrArea.appendChild(wrapper);

    // สร้าง QR โดยใช้ qrcodejs
    qr = new QRCode(wrapper, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // เปิดปุ่มดาวน์โหลด
    downloadBtn.disabled = false;
  }

  function downloadQRCodePNG() {
    // qrcodejs สร้างเป็น <img> หรือ <canvas> ขึ้นกับเบราว์เซอร์
    const qrElem = qrArea.querySelector('img') || qrArea.querySelector('canvas');
    if (!qrElem) return;

    if (qrElem.tagName.toLowerCase() === 'img') {
      // ถ้าเป็น img: โหลดแล้วสร้างลิงก์ดาวน์โหลด
      const src = qrElem.src;
      const a = document.createElement('a');
      a.href = src;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      // ถ้าเป็น canvas: แปลงเป็น data URL
      const dataUrl = qrElem.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
      alert('กรุณาใส่ลิงก์ก่อนครับ');
      return;
    }

    // ตรวจคร่าวๆ ว่าเป็น URL ถ้ายังไม่มี scheme ให้เติม http://
    let normalized = url;
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
      normalized = 'https://' + url;
    }

    try {
      // ตรวจความถูกต้องของ URL
      new URL(normalized);
    } catch (e) {
      alert('ลิงก์ไม่ถูกต้อง — กรุณาตรวจสอบอีกครั้ง');
      return;
    }

    createQRCode(normalized);
  });

  downloadBtn.addEventListener('click', downloadQRCodePNG);

  clearBtn.addEventListener('click', () => {
    urlInput.value = '';
    qrArea.innerHTML = '';
    downloadBtn.disabled = true;
  });

  // รองรับกด Enter ในช่อง input
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      generateBtn.click();
    }
  });
});
