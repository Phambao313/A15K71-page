document.addEventListener('DOMContentLoaded', () => {
    const chestContainer = document.getElementById('treasureChestContainer');
    const chestImg = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzT5BgLMXGsfZBDxZ2-AsdsqPz98kY7rVerz1QoOPdgLmiG8c0_y8ApmOOtX2cbaUdrlg/exec';
    let isChestOpen = false;

    // 1. Hàm lấy và xử lý dữ liệu Drive
   async function fetchApprovedImages() {
    try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        
        return data.map(item => {
            let rawUrl = item.imageUrl; // Lấy link từ cột B của bạn
            let directUrl = rawUrl;

            // Xử lý link Google Drive dựa trên hình ảnh image_d43b51.png
            if (rawUrl.includes('drive.google.com')) {
                let fileId = "";
                if (rawUrl.includes('id=')) {
                    fileId = rawUrl.split('id=')[1].split('&')[0];
                } else if (rawUrl.includes('/d/')) {
                    fileId = rawUrl.split('/d/')[1].split('/')[0];
                }
                
                if (fileId) {
                    // Chuyển sang link Direct để trình duyệt đọc được
                    // Đoạn này cực kỳ quan trọng để ảnh hiện lên web
                var directUrl = rawUrl.replace('open?id=', 'uc?export=view&id=');
                }
            }
            
// Sửa lại đoạn return bên trong hàm .map() hoặc vòng lặp của bạn
return {
    imageUrl: directUrl, // Đảm bảo dùng biến directUrl đã được chuyển đổi
    name: item.name || "Kỷ niệm"
};
            };
        });
    } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
        return [];
    }
}

    // 2. Sự kiện click mở rương
    chestContainer.addEventListener('click', async () => {
        if (isChestOpen) return;

        chestImg.classList.add('shake');

        setTimeout(async () => {
            // Mở rương ngay lập tức
            chestImg.classList.remove('shake');
            chestImg.src = 'ảnh rương mở.png'; 
            isChestOpen = true;

            const images = await fetchApprovedImages();
            if (!images.length) return;

            const gridW = photoGrid.offsetWidth;
            const gridH = photoGrid.offsetHeight;

            images.forEach((imgData, index) => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                
                // Tính toán vị trí an toàn trong khung
                const x = Math.random() * (gridW - 220) + 110;
                const y = Math.random() * (gridH - 170) + 85;
                const rot = Math.random() * 40 - 20;

                item.style.setProperty('--end-x', `${x}px`);
                item.style.setProperty('--end-y', `${y}px`);
                item.style.setProperty('--random-rotation', `${rot}deg`);
                item.style.setProperty('--animation-delay', `${index * 0.1}s`);

                item.innerHTML = `<img src="${imgData.imageUrl}" alt="A15">`;
                photoGrid.appendChild(item);

                // Kích hoạt nhảy sau 50ms
                setTimeout(() => item.classList.add('animate-pop-out'), 50);

                // Gắn sự kiện phóng to ảnh
                item.addEventListener('click', (e) => {
                    e.stopPropagation(); // Không cho kích hoạt click rương lần nữa
                    openModal(imgData.imageUrl);
                });
            });
        }, 600);
    });

    // 3. Hàm phóng to ảnh (Modal)
    function openModal(src) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        modal.style.display = "flex";
        modalImg.src = src;
    }

    document.querySelector('.close-button')?.addEventListener('click', () => {
        document.getElementById('imageModal').style.display = "none";
    });
});




