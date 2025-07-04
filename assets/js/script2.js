// Fungsi untuk scroll Related Items
function scrollRelatedItems(buttonElement, direction) {
    // Temukan kontainer carousel terdekat dari tombol yang diklik
    const carouselContainer = buttonElement.closest('.related-items-carousel-container');
    
    // Temukan wrapper item terkait di dalam kontainer carousel tersebut
    const container = carouselContainer ? carouselContainer.querySelector('.related-items-wrapper') : null;

    // Pastikan container ada sebelum mencoba menggunakannya
    if (container) {
        const scrollAmount = container.clientWidth / 2; // Scroll setengah lebar container
        if (direction === 1) {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else {
        console.warn("Element '.related-items-wrapper' not found within the clicked carousel's container.");
    }
}

// Fungsi untuk scroll-to-top (di luar DOMContentLoaded agar bisa diakses global oleh onclick="topFunction()")
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Pastikan semua script dijalankan setelah DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Ambil referensi elemen-elemen yang dibutuhkan untuk Navbar & Menu Samping
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
            lmenu.classList.remove('lm'); // Menggunakan classList.remove('lm') seperti di kode yang "mengganggu"
            xBtn.style.display = "flex";
            fullsc.style.display = 'flex';
        });
    } else {
        console.warn("One or more elements for the side menu (all, lmenu, x, fullsc) were not found.");
    }

    // Jika tombol 'x' ada, tambahkan event listener
    if (xBtn && lmenu && fullsc) {
        xBtn.addEventListener("click", function() {
            lmenu.classList.add('lm'); // Menggunakan classList.add('lm') seperti di kode yang "mengganggu"
            xBtn.style.display = "none"; // Set display ke none untuk 'x' saat ditutup
            fullsc.style.display = 'none';
        });
    } else {
        console.warn("One or more elements for closing the side menu (x, lmenu, fullsc) were not found.");
    }

    // Event listener untuk menutup menu samping saat fullsc diklik
    if (fullsc && lmenu && xBtn) { // Pastikan xBtn juga ada untuk disembunyikan
        fullsc.addEventListener("click", function() {
            lmenu.classList.add('lm'); // Tutup menu samping
            xBtn.style.display = "none"; // Sembunyikan tombol 'x'
            fullsc.style.display = "none"; // Sembunyikan overlay
        });
    } else {
        console.warn("Element 'fullsc' or 'lmenu' not found for closing side menu on overlay click.");
    }

    // --- Event Listeners untuk Dropdown Menu Navigasi Utama (All, Departments) ---

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

    // --- Scroll-to-Top Button Visibility ---
    let mybutton = document.getElementById("myBtn");
    if (mybutton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        };
    } else {
        console.warn("Element 'myBtn' not found for scroll-to-top functionality.");
    }

    // --- Header Scroll Animation ---
    let lastScrollY = window.scrollY;
    const header1 = document.getElementById('header1'); // Get the header 1 element

    if (header1) { // Check if header1 exists
        window.addEventListener('scroll', () => {
            if (window.scrollY < lastScrollY) {
                // Scrolling up
                header1.style.transform = 'translateY(0)'; // Make it visible
            } else {
                // Scrolling down
                // Hanya sembunyikan jika scrollY melebihi tinggi header awal
                if (window.scrollY > header1.offsetHeight) { 
                    header1.style.transform = 'translateY(-100%)'; // Hide it by moving it up
                }
            }
            lastScrollY = window.scrollY;
        });
    } else {
        console.warn("Element 'header1' not found for scroll animation.");
    }


    // --- NEW: Toggle "See more" for Sidebar Filters ---
    const filterExpandToggles = document.querySelectorAll('.filter-expand-toggle');

    filterExpandToggles.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            const icon = this.querySelector('i');
            const textSpan = this.querySelector('span');

            if (targetElement) {
                if (targetElement.classList.contains('filter-hidden')) {
                    targetElement.classList.remove('filter-hidden');
                    icon.classList.remove('bi-chevron-down');
                    icon.classList.add('bi-chevron-up');
                    textSpan.textContent = 'See less';
                } else {
                    targetElement.classList.add('filter-hidden');
                    icon.classList.remove('bi-chevron-up');
                    icon.classList.add('bi-chevron-down');
                    textSpan.textContent = 'See more';
                }
            }
        });
    });

    // --- NEW: Price Slider (noUiSlider) ---
    const priceSlider = document.getElementById('price-slider');
    const sliderRangeValue = document.getElementById('slider-range-value');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');

    // Pastikan noUiSlider sudah dimuat dan elemen slider ada
    if (typeof noUiSlider !== 'undefined' && priceSlider) {
        noUiSlider.create(priceSlider, {
            start: [1, 5700], // Nilai awal min dan max sesuai screenshot
            connect: true, // Menghubungkan handle dengan bar warna
            range: {
                'min': 0,
                'max': 10000 // Sesuaikan rentang maksimum sesuai kebutuhan
            },
            step: 1, // Langkah kenaikan/penurunan
            tooltips: false, // Jangan tampilkan tooltip bawaan
            format: {
                to: function (value) {
                    return '$' + Math.round(value);
                },
                from: function (value) {
                    return Number(value.replace('$', ''));
                }
            }
        });

        // Update input fields and display text when slider changes
        priceSlider.noUiSlider.on('update', function (values, handle) {
            const val0 = Math.round(values[0]);
            const val1 = Math.round(values[1]);
            
            priceMinInput.value = val0;
            priceMaxInput.value = val1;

            let displayMax = val1;
            // Jika nilai maksimum slider adalah nilai maksimum yang diizinkan (misal 10000), tampilkan sebagai 5700+
            // Atau Anda bisa sesuaikan logika ini berdasarkan rentang harga spesifik Anda
            if (val1 === 10000) { // Asumsi 10000 adalah batas 'over'
                displayMax = '5,700+'; // Sesuai dengan tulisan di screenshot
            } else {
                displayMax = val1.toLocaleString(); // Format angka dengan koma
            }
            
            sliderRangeValue.textContent = `$${val0.toLocaleString()} - $${displayMax}`;
        });

        // Update slider when input fields change
        priceMinInput.addEventListener('change', function () {
            priceSlider.noUiSlider.set([this.value, null]);
        });
        priceMaxInput.addEventListener('change', function () {
            priceSlider.noUiSlider.set([null, this.value]);
        });

        // Initial text update based on default values or placeholder
        // Ini akan di-trigger oleh `on('update')` setelah `noUiSlider.create`
        // Tapi jika Anda ingin memastikan tampilan awal, Anda bisa set manual di sini juga.
        // Misalnya: sliderRangeValue.textContent = '$1 - $5,700+';
    } else if (!priceSlider) {
        console.warn("Element with ID 'price-slider' not found. Price slider functionality will not be initialized.");
    } else {
        console.warn("noUiSlider library is not loaded. Price slider functionality will not be initialized.");
    }

});