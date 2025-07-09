document.addEventListener("DOMContentLoaded", function() {
    // --- Navbar & Menu Samping (salin dari script2.js Anda jika ingin fungsionalitas ini ada di halaman detail) ---
    // Pastikan Anda hanya menyertakan kode ini jika Anda ingin fungsionalitas menu samping tetap ada.
    // Jika tidak, Anda bisa menghapus bagian ini.
    const allBtn = document.getElementById("all");
    const lmenu = document.getElementById("lmenu");
    const xBtn = document.getElementById("x");
    const fullsc = document.getElementById("fullsc");

    if (allBtn && lmenu && xBtn && fullsc) {
        allBtn.addEventListener("click", function(event) {
            event.preventDefault();
            lmenu.classList.remove('lm');
            xBtn.style.display = "flex";
            fullsc.style.display = 'flex';
        });
        xBtn.addEventListener("click", function() {
            lmenu.classList.add('lm');
            xBtn.style.display = "none";
            fullsc.style.display = 'none';
        });
        fullsc.addEventListener("click", function() {
            lmenu.classList.add('lm');
            xBtn.style.display = "none";
            fullsc.style.display = "none";
        });
    }

    // --- Thumbnail Image Selector ---
    const thumbnails = document.querySelectorAll('.product-thumbnail-gallery .thumbnail-list img');
    const mainProductImage = document.getElementById('main-product-image'); // ID spesifik untuk gambar utama

    if (thumbnails.length > 0 && mainProductImage) {
        // Set thumbnail pertama sebagai active secara default jika belum ada yang active
        if (!document.querySelector('.thumbnail-list li.active-thumbnail')) {
            thumbnails[0].closest('li').classList.add('active-thumbnail');
        }

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.closest('li').classList.remove('active-thumbnail'));
                // Add active class to clicked thumbnail's parent li
                this.closest('li').classList.add('active-thumbnail');
                
                // Change main image source using data-main-src attribute
                const newMainImageSrc = this.dataset.mainSrc;
                if (newMainImageSrc) {
                    mainProductImage.src = newMainImageSrc;
                }
            });
        });
    } else {
        console.warn("Product thumbnails or main image not found for image selector.");
    }

    // --- Product Description "Show more/less" Toggle ---
    const productDescriptionContent = document.getElementById('product-description-content');
    const showMoreLessLink = document.querySelector('.product-description-toggle');

    if (productDescriptionContent && showMoreLessLink) {
        // Fungsi untuk menginisialisasi status "Show more/less"
        const initializeShowMoreLess = () => {
            productDescriptionContent.style.maxHeight = 'none'; // Set ke none sementara untuk dapatkan scrollHeight asli
            const contentFullHeight = productDescriptionContent.scrollHeight;
            productDescriptionContent.style.maxHeight = ''; // Hapus style inline untuk kembali ke CSS

            const collapsedHeightLimit = 150; // Sesuaikan dengan `max-height` di CSS

            if (contentFullHeight > collapsedHeightLimit) {
                productDescriptionContent.classList.add('collapsed-content'); // Tambahkan kelas untuk membatasi tinggi
                productDescriptionContent.style.maxHeight = collapsedHeightLimit + 'px'; // Set tinggi awal yang terbatas
                showMoreLessLink.style.display = 'flex'; // Tampilkan tombol
                showMoreLessLink.querySelector('span').textContent = 'Show more';
                showMoreLessLink.querySelector('i').classList.remove('bi-chevron-up');
                showMoreLessLink.querySelector('i').classList.add('bi-chevron-down');
            } else {
                showMoreLessLink.style.display = 'none'; // Sembunyikan tombol jika konten tidak meluap
                productDescriptionContent.classList.remove('collapsed-content'); // Pastikan tidak ada kelas yang membatasi
                productDescriptionContent.style.maxHeight = 'none'; // Pastikan semua konten terlihat
            }
        };

        // Inisialisasi saat DOMContentLoaded dan juga saat resize window
        initializeShowMoreLess();
        window.addEventListener('resize', initializeShowMoreLess);


        showMoreLessLink.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            const textSpan = this.querySelector('span');

            if (productDescriptionContent.classList.contains('collapsed-content')) {
                // Expand konten
                productDescriptionContent.style.maxHeight = productDescriptionContent.scrollHeight + "px"; // Set ke tinggi penuh untuk animasi
                productDescriptionContent.classList.remove('collapsed-content'); // Hapus kelas collapsed
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
                textSpan.textContent = 'Show less';
                // Hapus max-height setelah animasi selesai untuk memastikan responsivitas
                productDescriptionContent.addEventListener('transitionend', function handler() {
                    productDescriptionContent.style.maxHeight = 'none'; // Hapus style inline
                    productDescriptionContent.removeEventListener('transitionend', handler);
                }, {once: true}); 
            } else {
                // Collapse konten
                // Pastikan tinggi saat ini terdefinisi sebelum transisi ke collapsed
                productDescriptionContent.style.maxHeight = productDescriptionContent.scrollHeight + "px"; 
                requestAnimationFrame(() => { 
                    productDescriptionContent.classList.add('collapsed-content'); // Tambahkan kelas collapsed
                    productDescriptionContent.style.maxHeight = '150px'; // Set tinggi terbatas
                });
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
                textSpan.textContent = 'Show more';
            }
        });
    } else {
        console.warn("Product description content or toggle link not found for 'Show more/less'.");
    }

    // --- Variant Selector (Color/Style) ---
    const variantItems = document.querySelectorAll('.style-variants .variant-item');
    const mainProductImageForVariants = document.getElementById('main-product-image'); // Dapatkan lagi referensi gambar utama
    const techColorSpan = document.getElementById('tech-color'); // Dapatkan referensi span untuk warna teknis
    const priceProduct = document.getElementById('price-product'); // Dapatkan referensi span untuk warna teknis
    const productBuyPrice = document.getElementById('product-buy-price'); // Dapatkan referensi span untuk harga beli produk


    if (variantItems.length > 0 && mainProductImageForVariants) {
        variantItems.forEach(item => {
            item.addEventListener('click', function() {
                variantItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Update the displayed style name
                const optionValueSpan = document.querySelector('.product-style-options .option-value');
                if (optionValueSpan) {
                    optionValueSpan.textContent = this.dataset.variantName; // Ambil dari data-variant-name
                    techColorSpan.textContent = this.dataset.variantName;
                    priceProduct.textContent = this.dataset.variantPrice; // Ambil dari data-variant-price
                    productBuyPrice.textContent = this.dataset.variantPrice; // Ambil dari data-variant-price

                }
                
                // Change the main product image based on the selected variant
                const newMainImageSrc = this.dataset.mainImage;
                if (newMainImageSrc) {
                    mainProductImageForVariants.src = newMainImageSrc;
                }
            });
        });
    } else {
        console.warn("Product variant items or main image not found for variant selector.");
    }
});

// Fungsi untuk scroll Related Items (Jika Anda ingin memasukkannya di file ini untuk semua JS)
// Catatan: Jika Anda tidak akan menggunakan carousel di halaman ini, fungsi ini tidak diperlukan.
// Tetapi jika nanti Anda ingin menambahkannya lagi, Anda bisa pakai fungsi ini.
function scrollRelatedItems(buttonElement, direction) {
    const carouselContainer = buttonElement.closest('.related-items-carousel-container');
    const container = carouselContainer ? carouselContainer.querySelector('.related-items-wrapper') : null;

    if (container) {
        const scrollAmount = container.clientWidth / 2;
        container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    } else {
        console.warn("Element '.related-items-wrapper' not found within the clicked carousel's container.");
    }
}

// Fungsi untuk scroll carousel produk
function scrollCarousel(buttonElement, direction) {
    const carouselContainer = buttonElement.closest('.product-carousel-container');
    const wrapper = carouselContainer ? carouselContainer.querySelector('.product-carousel-wrapper') : null;

    if (wrapper) {
        // Lebar satu item card + margin (180px + 2*8px = 196px)
        const itemWidth = 196; 
        // Hitung berapa item yang terlihat di viewport
        const itemsInView = Math.floor(wrapper.clientWidth / itemWidth);
        const scrollAmount = direction * itemsInView * itemWidth;

        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        console.warn("Product carousel wrapper not found.");
    }
}

// Function to scroll the videos carousel
function scrollVideosCarousel(buttonElement, direction) {
    const carouselContainer = buttonElement.closest('.videos-carousel-container');
    const wrapper = carouselContainer ? carouselContainer.querySelector('.videos-carousel-wrapper') : null;

    if (wrapper) {
        // Calculate scroll amount based on video item card width + margin
        // video-item-card width: 200px, margin-left/right: 8px each (total 16px per item)
        const itemWidth = 200 + (8 * 2); 
        // Determine how many items fit in the current view
        const itemsInView = Math.floor(wrapper.clientWidth / itemWidth);
        const scrollAmount = direction * itemsInView * itemWidth;

        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        console.warn("Videos carousel wrapper not found.");
    }
}

// Function to scroll the Brands carousel
function scrollBrandCarousel(buttonElement, direction) {
    const carouselContainer = buttonElement.closest('.brand-category-grid-container');
    const wrapper = carouselContainer ? carouselContainer.querySelector('.brand-category-grid-wrapper') : null;

    if (wrapper) {
        // Calculate scroll amount based on brand item card width + margin
        // brand-category-item width: 200px, margin-left/right: 8px each (total 16px per item)
        const itemWidth = 200 + (8 * 2); 
        // Determine how many items fit in the current view
        const itemsInView = Math.floor(wrapper.clientWidth / itemWidth);
        const scrollAmount = direction * itemsInView * itemWidth;

        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        console.warn("Brand carousel wrapper not found.");
    }
}