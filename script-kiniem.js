document.addEventListener('DOMContentLoaded', () => {
    // 1. Khai báo các thành phần giao diện
    const chestContainer = document.getElementById('treasureChestContainer');
    const chestImg = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbu-c603A_hCq5K6L-3G-H-I1M-lP_X4Z-K6-f2/exec'; 
    let isChestOpen = false;

    // 2. Hàm lấy và xử lý dữ liệu Drive (Đảm bảo link uc?export=view)
    async function fetchApprovedImages() {
        try {
            const response = await fetch(scriptURL);
            const data = await response.json();
            
            return data.map(item => {
                let directUrl = item.imageUrl;
                // Chuyển đổi link Drive sang dạng hiển thị được trên web
                if (directUrl && directUrl.includes('drive.google.com')) {
                    const fileId = directUrl.match(/[-\w]{25,}/);
                    if (fileId) directUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
                }
                return { imageUrl: directUrl, name: item.name || "A15" };
            });
        } catch (e) {
            console.error("Lỗi kết nối dữ liệu:", e);
            return [];
        }
    }

    // 3. Sự kiện Click mở rương
    chestContainer.addEventListener('click', async () => {
        if (isChestOpen) return;
        
        // Hiệu ứng rung rương
        chestImg.classList.add('shake');
        
        setTimeout(async () => {
            chestImg.classList.remove('shake');
            // Thay đổi ảnh rương thành rương đã mở (Kiểm tra đúng tên file nhé)
            chestImg.src = 'ảnh rương mở.png'; 
            isChestOpen = true;

            // Lấy dữ liệu ảnh
            const images = await fetchApprovedImages();
            
            if (images && images.length > 0) {
                photoGrid.innerHTML = ''; // Xóa thông báo chờ
                
                images.forEach((imgData, index) => {
                    const item = document.createElement('div');
                    item.className = 'photo-item'; // Class này phải khớp với CSS
                    
                    item.innerHTML = `
                        <div class="card-inner">
                            <img src="${imgData.imageUrl}" alt="Kỷ niệm" onerror="this.src='https://via.placeholder.com/150?text=Lỗi+Ảnh'">
                            <p>${imgData.name}</p>
                        </div>
                    `;
                    
                    photoGrid.appendChild(item);

                    // Hiệu ứng xuất hiện từng tấm một
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) rotate(' + (Math.random() * 10 - 5) + 'deg)';
                    }, index * 200);
                });
            }
        }, 600);
    });
});
