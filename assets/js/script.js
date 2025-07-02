document.getElementById('all').addEventListener('click', function(){
    document.getElementById('lmenu').classList.remove('lm')
    document.getElementById('x').style.display = "flex"
    document.getElementById('fullsc').style.display = 'flex'

})
document.getElementById('x').addEventListener('click', function(){
  document.getElementById('lmenu').classList.add('lm')
    document.getElementById('x').style.display = "none"
    document.getElementById('fullsc').style.display = 'none'

})
document.getElementById('activDnMenu').addEventListener('click' , function(){
  
  document.getElementById('dnMenu').classList.toggle('d2')
  document.getElementById('_icon1').classList.toggle('bi-chevron-down')
  document.getElementById('_icon1').classList.toggle('bi-chevron-up')


})
document.getElementById('activDnMenu2').addEventListener('click' , function(){
  
  document.getElementById('dnMenu2').classList.toggle('d2')
  document.getElementById('_icon2').classList.toggle('bi-chevron-down')
  document.getElementById('_icon2').classList.toggle('bi-chevron-up')


})

// Fungsi untuk scroll Related Items
function scrollRelatedItems(direction) {
    const container = document.querySelector('.related-items-wrapper');
    const scrollAmount = container.clientWidth / 2; // Scroll setengah lebar container
    if (direction === 1) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Tambahkan event listener untuk menu samping (dari kode Anda sebelumnya)
// ... kode JavaScript lainnya yang sudah ada di script.js Anda ...
// Contoh dari kode Anda:
document.addEventListener("DOMContentLoaded", function() {
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

    // Existing event listeners from your code
    if (allBtn) {
        allBtn.addEventListener("click", function(event) {
            event.preventDefault();
            lmenu.style.left = "0%";
            fullsc.style.display = "block";
        });
    }

    if (xBtn) {
        xBtn.addEventListener("click", function() {
            lmenu.style.left = "-100%";
            fullsc.style.display = "none";
        });
    }

    if (activDnMenu) {
        activDnMenu.addEventListener("click", function() {
            dnMenu.classList.toggle("d2");
            _icon1.classList.toggle("bi-chevron-down");
            _icon1.classList.toggle("bi-chevron-up");
        });
    }

    if (activDnMenu2) {
        activDnMenu2.addEventListener("click", function() {
            dnMenu2.classList.toggle("d2");
            _icon2.classList.toggle("bi-chevron-down");
            _icon2.classList.toggle("bi-chevron-up");
        });
    }

    if (fullsc) {
        fullsc.addEventListener("click", function() {
            lmenu.style.left = "-100%";
            fullsc.style.display = "none";
        });
    }
});

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}