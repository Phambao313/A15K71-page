document.addEventListener('DOMContentLoaded', function() {
            const memberList = document.getElementById('memberList');
            const prevBtn = document.getElementById('nut-trai');
            const nextBtn = document.getElementById('nut-phai');

            // Kiểm tra xem máy có tìm thấy các thẻ này không
            if (!memberList || !prevBtn || !nextBtn) {
                console.error("Lỗi: Không tìm thấy nút bấm hoặc danh sách ảnh!");
                return;
            }

            // Khoảng cách cuộn (tăng lên 300 cho lướt nhanh hơn)
            const scrollAmount = 300; 

            nextBtn.addEventListener('click', () => {
                memberList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                memberList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        });