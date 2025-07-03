// Fungsi untuk scroll Related Items
function scrollRelatedItems(direction) {
    const container = document.querySelector('.related-items-wrapper');
    // Pastikan container ada sebelum mencoba menggunakannya
    if (container) {
        const scrollAmount = container.clientWidth / 2; // Scroll setengah lebar container
        if (direction === 1) {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else {
        console.warn("Element '.related-items-wrapper' not found for scrolling.");
    }
}

// Pastikan semua script dijalankan setelah DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Ambil referensi elemen-elemen yang dibutuhkan
    const allBtn = document.getElementById("all");
    const lmenu = document.getElementById("lmenu");
    const xBtn = document.getElementById("x");
    const fullsc = document.getElementById("fullsc");

    const activDnMenu = document.getElementById("activDnMenu");
    const dnMenu = document.getElementById("dnMenu");
    const _icon1 = document.getElementById("_icon1");

    const activDnMenu2 = document.getElementById("activDnMenu2");
    const dnMenu2 = document.getElementById("dnMenu2");
    const _icon2 = document.getElementById("_icon2");

    // --- Event Listeners untuk Menu Samping ---

    // Jika tombol 'all' ada, tambahkan event listener
    if (allBtn && lmenu && xBtn && fullsc) {
        allBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah perilaku default jika 'all' adalah link
            // Menggunakan classList.remove('lm') seperti di kode yang "mengganggu"
            lmenu.classList.remove('lm');
            xBtn.style.display = "flex";
            fullsc.style.display = 'flex';
        });
    } else {
        console.warn("One or more elements for the side menu (all, lmenu, x, fullsc) were not found.");
    }

    // Jika tombol 'x' ada, tambahkan event listener
    if (xBtn && lmenu && fullsc) {
        xBtn.addEventListener("click", function() {
            // Menggunakan classList.add('lm') seperti di kode yang "mengganggu"
            lmenu.classList.add('lm');
            xBtn.style.display = "none"; // Set display ke none untuk 'x' saat ditutup
            fullsc.style.display = 'none';
        });
    } else {
        console.warn("One or more elements for closing the side menu (x, lmenu, fullsc) were not found.");
    }

    // Event listener untuk menutup menu samping saat fullsc diklik
    if (fullsc && lmenu) {
        fullsc.addEventListener("click", function() {
            lmenu.classList.add('lm'); // Tutup menu samping
            xBtn.style.display = "none"; // Sembunyikan tombol 'x'
            fullsc.style.display = "none"; // Sembunyikan overlay
        });
    } else {
        console.warn("Element 'fullsc' or 'lmenu' not found for closing side menu on overlay click.");
    }

    // --- Event Listeners untuk Dropdown Menu ---

    // Jika activDnMenu ada, tambahkan event listener
    if (activDnMenu && dnMenu && _icon1) {
        activDnMenu.addEventListener("click", function() {
            dnMenu.classList.toggle("d2");
            _icon1.classList.toggle("bi-chevron-down");
            _icon1.classList.toggle("bi-chevron-up");
        });
    } else {
        console.warn("One or more elements for dropdown menu 1 (activDnMenu, dnMenu, _icon1) were not found.");
    }

    // Jika activDnMenu2 ada, tambahkan event listener
    if (activDnMenu2 && dnMenu2 && _icon2) {
        activDnMenu2.addEventListener("click", function() {
            dnMenu2.classList.toggle("d2");
            _icon2.classList.toggle("bi-chevron-down");
            _icon2.classList.toggle("bi-chevron-up");
        });
    } else {
        console.warn("One or more elements for dropdown menu 2 (activDnMenu2, dnMenu2, _icon2) were not found.");
    }
});


// --- Kode untuk Scroll-to-Top Button ---
// Pastikan myBtn ada sebelum mencoba mengaksesnya
let mybutton = document.getElementById("myBtn");

// Pastikan mybutton ada sebelum menambahkan event listener
if (mybutton) {
    // Saat pengguna menggulir ke bawah 20px dari atas dokumen, tampilkan tombol
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
} else {
    console.warn("Element 'myBtn' not found for scroll-to-top functionality.");
}


// Saat pengguna mengklik tombol, gulir ke atas dokumen
function topFunction() {
    document.body.scrollTop = 0; // Untuk Safari
    document.documentElement.scrollTop = 0; // Untuk Chrome, Firefox, IE, dan Opera
}