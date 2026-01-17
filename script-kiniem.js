document.addEventListener('DOMContentLoaded', () => {
    const treasureChestContainer = document.getElementById('treasureChestContainer');
    const treasureChest = document.getElementById('treasureChest');
    const sparkles = document.getElementById('sparkles');
    const photoGrid = document.getElementById('photoGrid');
    const clickText = document.querySelector('.click-text');

    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');

    let isChestOpen = false;

    // Hàm giả lập dữ liệu ảnh từ Google Sheets
    // Thực tế bạn sẽ thay thế bằng URL AppScript của bạn
    async function fetchApprovedImages() {
        // Đây là ví dụ ảnh tĩnh. Bạn sẽ thay thế bằng:
        // const scriptURL = 'ĐƯỜNG_DẪN_URL_APPSCRIPT_CỦA_BẠN';
        // const response = await fetch(scriptURL);
        // const data = await response.json();
        // return data.map(item => item.imageUrl);

        return [
            "", // Thay bằng link ảnh thật của bạn
            "https://i.imgur.com/example2.jpg",
            "https://i.imgur.com/example3.jpg",
            "https://i.imgur.com/example4.jpg",
            "https://i.imgur.com/example5.jpg",
            "https://i.imgur.com/example6.jpg",
            "https://i.imgur.com/example7.jpg",
            "https://i.imgur.com/example8.jpg",
            "https://i.imgur.com/example9.jpg",
            "https://i.imgur.com/example10.jpg"
        ];
    }

    // Xử lý khi nhấn vào rương
    treasureChestContainer.addEventListener('click', async () => {
        if (isChestOpen) return; // Chỉ mở 1 lần

        // 1. Hiệu ứng lắc rương
        treasureChest.classList.add('shake');
        sparkles.style.opacity = 1;
        clickText.style.opacity = 0;

        setTimeout(async () => {
            treasureChest.classList.remove('shake');
            sparkles.style.opacity = 0;

            // 2. Thay ảnh rương đóng thành rương mở
            treasureChest.src = 'ảnh rương mở.png'; // Bạn cần ảnh rương mở
            treasureChest.alt = 'Rương kho báu mở';

            // 3. Tải ảnh và hiển thị
            const imageUrls = await fetchApprovedImages();
            
            photoGrid.innerHTML = imageUrls.map(url => {
                const randomRotation = Math.random() * 20 - 10; // Xoay ngẫu nhiên từ -10 đến 10 độ
                return `
                    <div class="grid-item" style="--random-rotation: ${randomRotation};">
                        <img src="${url}" alt="Kỷ niệm">
                    </div>
                `;
            }).join('');

            photoGrid.classList.add('open');
            isChestOpen = true;

            // Gắn sự kiện click cho từng ảnh trong grid
            document.querySelectorAll('.grid-item img').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Ngăn sự kiện click từ ảnh lan ra các phần tử khác
                    modalImage.src = e.target.src;
                    imageModal.style.display = "block";
                });
            });

        }, 800); // Đợi hiệu ứng lắc xong thì mở rương
    });

    // Đóng Popup ảnh
    closeButton.addEventListener('click', () => {
        imageModal.style.display = "none";
    });
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) { // Chỉ đóng khi click vào nền đen
            imageModal.style.display = "none";
        }
    });

    // Tạo ảnh rương đóng và mở (bạn cần tự tạo hoặc tìm ảnh PNG)
    // Hoặc tải ảnh mẫu sau:
    // chest-closed.png: https://i.imgur.com/4X1YgqV.png
    // chest-open.png:   https://i.imgur.com/tX5N0tD.png

});
