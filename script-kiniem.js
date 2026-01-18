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
        
        // Chuyển đổi dữ liệu và xử lý link Drive cùng lúc
        return data.map(item => {
            let directUrl = item.imageUrl;
            
            if (directUrl && directUrl.includes('drive.google.com')) {
                let fileId = "";
                if (directUrl.includes('id=')) {
                    fileId = directUrl.split('id=')[1].split('&')[0];
                } else if (directUrl.includes('/d/')) {
                    fileId = directUrl.split('/d/')[1].split('/')[0];
                }
                
                if (fileId) {
                    directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                }
            }

            return {
                imageUrl: directUrl,
                name: item.name || "Kỷ niệm"
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

           // Thay thế đoạn inside images.forEach((imgData, index) => { ... })
images.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'photo-item'; // Sử dụng class photo-item đã định nghĩa trong CSS
    
    item.innerHTML = `
        <img src="${imgData.imageUrl}" alt="A15">
        <p style="text-align:center; margin-top:5px;">${imgData.name}</p>
    `;
    
    photoGrid.appendChild(item);
    
    // Thêm hiệu ứng xuất hiện dần dần
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);
});
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






