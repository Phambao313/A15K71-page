document.addEventListener('DOMContentLoaded', () => {
    const treasureChestContainer = document.getElementById('treasureChestContainer');
    const treasureChest = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwvUKBMuZWunxH1TH1X-HzX-dsPRfZVbKhjQLrVJKKAIA9I4r_iYczutMvZYiST1YHB/exec'; // Thay bằng URL của bạn

    let isChestOpen = false;

    async function fetchApprovedImages() {
        try {
            const response = await fetch(scriptURL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error);
            return [];
        }
    }

  treasureChestContainer.addEventListener('click', async () => {
    if (isChestOpen) return;

    // 1. Hiệu ứng lắc rương luôn chạy trước
    treasureChest.classList.add('shake');

    setTimeout(async () => {
        // 2. ÉP RƯƠNG PHẢI MỞ (Để đảm bảo không bị kẹt dù ảnh lỗi)
        treasureChest.classList.remove('shake');
        treasureChest.src = 'chest-open.png'; 
        isChestOpen = true;

        try {
            const images = await fetchApprovedImages();
            if (!images || images.length === 0) return;

            // 3. TÍNH TOÁN VỊ TRÍ AN TOÀN (Đây là phần bạn vừa thêm dẫn đến lỗi)
            // Sử dụng Math.min để ép ảnh không bao giờ vượt quá biên màn hình
            const containerW = photoGrid.offsetWidth || window.innerWidth;
            const containerH = photoGrid.offsetHeight || 600;

            images.forEach((imgData, index) => {
                const imgW = 200; // Chiều rộng ảnh
                const imgH = 150; // Chiều cao ảnh

                // Tọa độ ngẫu nhiên nhưng trừ đi kích thước ảnh và lề 50px
                const posX = Math.random() * (containerW - imgW - 100) + 50;
                const posY = Math.random() * (containerH - imgH - 100) + 50;
                const rotation = Math.random() * 30 - 15;

                const item = document.createElement('div');
                item.className = 'grid-item';
                
                // Truyền tọa độ vào CSS
                item.style.left = "0"; item.style.top = "0"; // Reset vị trí gốc
                item.style.setProperty('--end-x', `${posX}px`);
                item.style.setProperty('--end-y', `${posY}px`);
                item.style.setProperty('--random-rotation', `${rotation}deg`);
                item.style.setProperty('--animation-delay', `${index * 0.2}s`);

                item.innerHTML = `<img src="${imgData.imageUrl}" alt="Kỷ niệm">`;
                photoGrid.appendChild(item);

                setTimeout(() => item.classList.add('animate-pop-out'), 50);
            });
        } catch (e) {
            console.error("Lỗi xử lý ảnh nhảy ra:", e);
        }
    }, 800);
});

    function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var rawUrl = data[i][1]; // Link ở cột B
    var status = data[i][2]; // Trạng thái ở cột C
    
    if (status.toLowerCase() == "duyệt" && rawUrl != "") {
      var directLink = "";
      
      // Kiểm tra nếu là link Google Drive
      if (rawUrl.includes("drive.google.com")) {
        var fileId = "";
        // Trích xuất ID của file từ link Drive
        if (rawUrl.includes("id=")) {
          fileId = rawUrl.split("id=")[1].split("&")[0];
        } else if (rawUrl.includes("/d/")) {
          fileId = rawUrl.split("/d/")[1].split("/")[0];
        }
        
        // Chuyển thành link xem trực tiếp (Direct Link)
        if (fileId != "") {
          directLink = "https://lh3.googleusercontent.com/d/" + fileId;
        }
      } else {
        // Nếu đã là link ảnh trực tiếp từ nơi khác (imgur, v.v.) thì giữ nguyên
        directLink = rawUrl;
      }

      if (directLink != "") {
        result.push({
          imageUrl: directLink,
          name: "Kỷ niệm A15"
        });
      }
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

    closeButton.addEventListener('click', () => imageModal.style.display = "none");
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) imageModal.style.display = "none";
    });
});
// Lấy kích thước thực tế của khung chứa ảnh
const gridWidth = photoGrid.clientWidth;
const gridHeight = photoGrid.clientHeight;

// Kích thước ảnh bạn muốn hiển thị
const finalWidth = 200; 
const finalHeight = 150;

// Tính toán tọa độ ngẫu nhiên NHƯNG phải nằm TRONG khung
// Chúng ta chừa ra 20px lề để ảnh không dính sát mép
const endX = Math.random() * (gridWidth - finalWidth - 40) + (finalWidth / 2) + 20;
const endY = Math.random() * (gridHeight - finalHeight - 40) + (finalHeight / 2) + 20;
// Kiểm tra nếu là điện thoại thì cho ảnh nhỏ lại
const isMobile = window.innerWidth < 768;
const finalWidth = isMobile ? 140 : 200; 
const finalHeight = isMobile ? 100 : 150;


