// --- XỬ LÝ CHO TỔ 1 ---
const nutTrai1 = document.getElementById('nut-trai-1');
const nutPhai1 = document.getElementById('nut-phai-1');
const memberList1 = document.getElementById('memberList-1');

if(nutTrai1 && nutPhai1 && memberList1) {
    nutPhai1.addEventListener('click', () => {
        memberList1.scrollLeft += 300; // Cuộn sang phải 300px
    });

    nutTrai1.addEventListener('click', () => {
        memberList1.scrollLeft -= 300; // Cuộn sang trái 300px
    });
}

// --- XỬ LÝ CHO TỔ 2 (Code mới thêm vào) ---
const nutTrai2 = document.getElementById('nut-trai-2');
const nutPhai2 = document.getElementById('nut-phai-2');
const memberList2 = document.getElementById('memberList-2');

if(nutTrai2 && nutPhai2 && memberList2) {
    nutPhai2.addEventListener('click', () => {
        memberList2.scrollLeft += 300; 
    });

    nutTrai2.addEventListener('click', () => {
        memberList2.scrollLeft -= 300;
    });
}

// --- XỬ LÝ CHO TỔ 3 (Code mới thêm vào) ---
const nutTrai3 = document.getElementById('nut-trai-3');
const nutPhai3 = document.getElementById('nut-phai-3');
const memberList3 = document.getElementById('memberList-3');

if(nutTrai3 && nutPhai3 && memberList3) {
    nutPhai3.addEventListener('click', () => {
        memberList3.scrollLeft += 300; 
    });

    nutTrai3.addEventListener('click', () => {
        memberList3.scrollLeft -= 300;
    });
}

// --- XỬ LÝ CHO TỔ 4 (Code mới thêm vào) ---
const nutTrai4 = document.getElementById('nut-trai-4');
const nutPhai4 = document.getElementById('nut-phai-4');
const memberList4 = document.getElementById('memberList-4');

if(nutTrai4 && nutPhai4 && memberList4) {
    nutPhai4.addEventListener('click', () => {
        memberList4.scrollLeft += 300; 
    });

    nutTrai4.addEventListener('click', () => {
        memberList4.scrollLeft -= 300;
    });
}
