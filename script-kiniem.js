document.addEventListener('DOMContentLoaded', () => {
    const chestContainer = document.getElementById('treasureChestContainer');
    const chestImg = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    
    // LINK QUAN TRỌNG: Bạn hãy thay mã này bằng mã lấy từ nút Deploy của bạn
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxzOSQWLqhihM96AMoz45q8lyOByyLxjc8d42DsxK_G0U2GCedknSg2a9IdgYWKgz-FbA/exec'; 
    let isChestOpen = false;

    chestContainer.onclick = async () => {
        if (isChestOpen) return;
        
        // 1. Hiệu ứng rương rung và mở (Luôn chạy bất kể mạng chậm)
        chestImg.classList.add('shake');
        
        setTimeout(() => {
            chestImg.classList.remove('shake');
            chestImg.src = 'ảnh rương mở.png'; // Đảm bảo file này đúng tên trên GitHub
            isChestOpen = true;
            
            // 2. Sau khi rương mở, bắt đầu load ảnh
            loadMemories();
        }, 600);
    };

    async function loadMemories() {
        photoGrid.innerHTML = '<p style="text-align:center; width:100%;">Đang tìm kho báu...</p>';
        
        try {
            const response = await fetch(scriptURL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data && data.length > 0) {
                photoGrid.innerHTML = '';
                data.forEach((item, index) => {
                    // Chuyển link Drive sang link trực tiếp ngay tại đây
                    let finalUrl = item.imageUrl;
                    const fileId = finalUrl.match(/[-\w]{25,}/);
                    if (fileId) finalUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;

                    const div = document.createElement('div');
                    div.className = 'photo-item';
                    div.innerHTML = `
                        <img src="${finalUrl}" alt="Kỷ niệm" onerror="this.src='https://via.placeholder.com/150?text=Lỗi+Ảnh'">
                        <p style="text-align:center; margin-top:10px; font-weight:bold;">${item.name || 'A15'}</p>
                    `;
                    photoGrid.appendChild(div);

                    // Hiệu ứng hiện từng tấm
                    setTimeout(() => { div.style.opacity = '1'; }, index * 200);
                });
            } else {
                photoGrid.innerHTML = '<p>Chưa có kho báu nào được duyệt!</p>';
            }
        } catch (error) {
            console.error('Lỗi:', error);
            photoGrid.innerHTML = '<p>Lỗi kết nối. Hãy kiểm tra lại link Script hoặc quyền chia sẻ Drive!</p>';
        }
    }
});


