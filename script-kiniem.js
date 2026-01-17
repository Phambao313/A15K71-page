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

        treasureChest.classList.add('shake');

        setTimeout(async () => {
            treasureChest.classList.remove('shake');
            treasureChest.src = 'ảnh rương mở.png';

            const images = await fetchApprovedImages();
            
            if (images.length === 0) {
                alert('Rương hiện đang trống, hãy chờ admin duyệt ảnh nhé!');
                return;
            }

            // Tính toán vị trí và áp dụng hiệu ứng cho từng ảnh
            images.forEach((imgData, index) => {
                const randomRotation = Math.random() * 30 - 15; // -15 đến 15 độ
                
                // Tính toán vị trí ngẫu nhiên cho mỗi ảnh trong photoGrid
                // Tọa độ X và Y dựa trên kích thước của photoGrid
                const gridWidth = photoGrid.offsetWidth;
                const gridHeight = photoGrid.offsetHeight; // Có thể cần điều chỉnh min-height của photo-grid
                
                const finalWidth = 200; // Kích thước cuối cùng của ảnh
                const finalHeight = 150;
                
                // Vị trí ngẫu nhiên trong khoảng an toàn (tránh ra ngoài mép)
                const endX = Math.random() * (gridWidth - finalWidth) + (finalWidth / 2);
                const endY = Math.random() * (gridHeight - finalHeight) + (finalHeight / 2);

                const animationDelay = index * 0.05; // Mỗi ảnh nhảy ra cách nhau 0.1s
                const animationDuration = 0.8; // Thời gian hiệu ứng nhảy

                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                gridItem.style.setProperty('--random-rotation', randomRotation);
                gridItem.style.setProperty('--end-x', `${endX}px`);
                gridItem.style.setProperty('--end-y', `${endY}px`);
                gridItem.style.setProperty('--animation-delay', `${animationDelay}s`);
                gridItem.style.setProperty('--animation-duration', `${animationDuration}s`);
                gridItem.style.setProperty('--final-width', `${finalWidth}px`);
                gridItem.style.setProperty('--final-height', `${finalHeight}px`);


                gridItem.innerHTML = `<img src="${imgData.imageUrl}" alt="${imgData.name}" title="Từ: ${imgData.name}">`;
                photoGrid.appendChild(gridItem);

                // Kích hoạt animation
                setTimeout(() => {
                    gridItem.classList.add('animate-pop-out');
                }, 10); // Một delay nhỏ để đảm bảo thuộc tính CSS được áp dụng trước animation
            });

            photoGrid.classList.add('open');
            isChestOpen = true;

            setupImageZoom();
        }, 800);
    });

    function setupImageZoom() {
        // Gắn sự kiện click cho từng ảnh trong grid (chỉ sau khi chúng đã được tạo ra)
        document.querySelectorAll('.grid-item img').forEach(img => {
            img.addEventListener('click', () => {
                modalImage.src = img.src;
                imageModal.style.display = "flex";
            });
        });
    }

    closeButton.addEventListener('click', () => imageModal.style.display = "none");
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) imageModal.style.display = "none";
    });
});
