document.addEventListener('DOMContentLoaded', () => {
    // 1. Khai báo các biến - Đảm bảo ID khớp 100% với HTML của bạn
    const chestContainer = document.getElementById('treasureChestContainer');
    const chestImg = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzT5BgLMXGsfZBDxZ2-AsdsqPz98kY7rVerz1QoOPdgLmiG8c0_y8ApmOOtX2cbaUdrlg/exec'; 
    let isChestOpen = false;

    // 2. Hàm lấy dữ liệu từ Google Sheet
    async function fetchApprovedImages() {
        console.log("Đang kết nối lấy dữ liệu từ Google Sheet..."); // Lệnh kiểm tra trong Console
        try {
            const response = await fetch(scriptURL);
            const data = await response.json();
            return data.map(item => {
                let directUrl = item.imageUrl;
                // Chuyển đổi link Drive sang dạng xem trực tiếp
                if (directUrl && directUrl.includes('drive.google.com')) {
                    const fileId = directUrl.match(/[-\w]{25,}/);
                    if (fileId) directUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
                }
                return { imageUrl: directUrl, name: item.name || "A15" };
            });
        } catch (e) {
            console.error("Lỗi lấy dữ liệu:", e);
            return [];
        }
    }

    // 3. Sự kiện Click mở rương - PHẢI nằm trong DOMContentLoaded
    if (chestContainer) {
        chestContainer.onclick = async () => {
            if (isChestOpen) return;
            console.log("Rương đang mở...");

            // Hiệu ứng rung
            chestImg.classList.add('shake');
            
            setTimeout(async () => {
                chestImg.classList.remove('shake');
                // SỬA TÊN FILE ẢNH Ở ĐÂY CHO ĐÚNG VỚI GITHUB CỦA BẠN
                chestImg.src = 'ảnh rương mở.png'; 
                isChestOpen = true;

                const images = await fetchApprovedImages();
                
                if (images && images.length > 0) {
                    photoGrid.innerHTML = ''; // Xóa nội dung cũ
                    
                    images.forEach((imgData, index) => {
                        const item = document.createElement('div');
                        item.className = 'photo-item'; // Khớp với CSS của bạn
                        
                        item.innerHTML = `
                            <img src="${imgData.imageUrl}" alt="Kỷ niệm" onerror="this.src='https://via.placeholder.com/150?text=Lỗi+Ảnh'">
                            <p style="text-align:center; margin-top:10px;">${imgData.name}</p>
                        `;
                        
                        photoGrid.appendChild(item);

                        // Hiệu ứng xuất hiện
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 200);
                    });
                } else {
                    photoGrid.innerHTML = '<p style="text-align:center; width:100%;">Chưa có kho báu nào được duyệt!</p>';
                }
            }, 600);
        };
    } else {
        console.error("Không tìm thấy rương! Hãy kiểm tra ID 'treasureChestContainer' trong HTML.");
    }
});
