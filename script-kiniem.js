document.addEventListener('DOMContentLoaded', () => {
    const chestContainer = document.getElementById('treasureChestContainer');
    const chestImg = document.getElementById('treasureChest');
    const photoGrid = document.getElementById('photoGrid');
    
    // Đảm bảo link scriptURL này là link /exec mới nhất của bạn
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxzOSQWLqhihM96AMoz45q8lyOByyLxjc8d42DsxK_G0U2GCedknSg2a9IdgYWKgz-FbA/exec'; 
    
    // KHAI BÁO BIẾN - KHÔNG ĐƯỢC XÓA 2 DÒNG NÀY
    let isChestOpen = false;
    let isDataLoaded = false;

    if (chestContainer) {
        chestContainer.onclick = async () => {
            if (isChestOpen) return;
            isChestOpen = true;

            // Hiệu ứng rung rương
            chestImg.classList.add('shake');

            setTimeout(async () => {
                chestImg.classList.remove('shake');
                // Sửa đúng tên file ảnh rương mở trên GitHub của bạn
                chestImg.src = 'ảnh rương mở.png'; 

                if (!isDataLoaded) {
                    await loadMemories();
                    isDataLoaded = true;
                }
            }, 600);
        };
    }

    async function loadMemories() {
        if (photoGrid) photoGrid.innerHTML = '<p style="text-align:center; width:100%;">Đang tìm kho báu...</p>';
        try {
            const response = await fetch(scriptURL);
            if (!response.ok) throw new Error('Kết nối thất bại');
            const data = await response.json();

            if (data && data.length > 0) {
                photoGrid.innerHTML = '';
                data.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'photo-item';
                    
                    div.innerHTML = `
                        <img src="${item.imageUrl}" alt="Kỷ niệm" onerror="this.src='https://via.placeholder.com/150?text=Lỗi+Ảnh'">
                        <p style="text-align:center; margin-top:10px; font-weight:bold;">${item.name || 'A15'}</p>
                    `;
                    photoGrid.appendChild(div);
                    
                    // Hiệu ứng hiện dần
                    setTimeout(() => { div.style.opacity = '1'; }, index * 100);
                });
            } else {
                photoGrid.innerHTML = '<p>Chưa có ảnh nào được duyệt!</p>';
            }
        } catch (e) {
            console.error("Lỗi:", e);
            photoGrid.innerHTML = '<p>Lỗi kết nối dữ liệu. Hãy kiểm tra lại link Script!</p>';
        }
    }
});
