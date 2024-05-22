
/********* Alert common js *********/

// alert dismissible
if (document.querySelectorAll('.alert-dismissible')) {
    var alertDismiss = document.querySelectorAll('.alert-dismissible');

    Array.from(alertDismiss).forEach(function (item) {
        item.querySelector(".alert-close").addEventListener('click', function () {
            item.classList.add('hidden');
        });
    });
}


/********************* Area Range Value **********************/

var slider1 = document.getElementById('slider1');
if(slider1)
{
    noUiSlider.create(slider1, {
        start: [9],
        step: 1,
        range: {
            'min': [1],
            'max': [15]
        }
    });

    var slider1Value = document.getElementById('slider1-span');
    if(slider1Value)
    {
        slider1.noUiSlider.on('update', function (values, handle) {
            slider1Value.innerHTML = values[handle];
        });
    }
    
}



/************** Blog Slider *************/

var swiper = new Swiper(".blogSlider", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        200: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    },
});

var swiper = new Swiper(".blogdetailSlider", {
    loop: true,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

if(document.getElementById("#choices-single-filter-orderby"))
    var singleFilter = new Choices('#choices-single-filter-orderby');

if(document.getElementById("#choices-candidate-page"))
    var singleCandidate = new Choices('#choices-candidate-page');


/*************Coming Soon Js************/

document.addEventListener('DOMContentLoaded', function () {

    // Set the date we're counting down to
    var countDownDate = new Date("dec 1, 2023").getTime();

    // Update the count down every 1 second
    var countDown = setInterval(function () {

        // Get today's date and time
        var currentTime = new Date().getTime();

        // Find the distance between currentTime and the count down date
        var distance = countDownDate - currentTime;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var countDownBlock = '<div class="countdownlist-item">'+
                                '<div class="count-title">Days</div>'+'<div class="count-num">'+ days +'</div>'+
                            '</div>'+
                            '<div class="countdownlist-item">'+
                                '<div class="count-title">Hours</div>'+'<div class="count-num">'+ hours +'</div>'+
                            '</div>'+
                            '<div class="countdownlist-item">'+
                                '<div class="count-title">Minutes</div>'+'<div class="count-num">'+ minutes +'</div>'+
                            '</div>'+
                            '<div class="countdownlist-item">'+
                                '<div class="count-title">Seconds</div>'+'<div class="count-num">'+ seconds +'</div>'+
                            '</div>';

        if(document.getElementById("countdown"))
        {
            // Output the result in an element with id="countDownBlock"
            document.getElementById("countdown").innerHTML = countDownBlock;

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(countDown);
                document.getElementById("countdown").innerHTML = '<div class="countdown-endtxt">The countdown has ended!</div>';
            }
        }             
        
    }, 1000);

});

// var spy = new Gumshoe('#elementsBar a',{
//     offset:90
// });


// Smooth scroll 
var scroll = new SmoothScroll('#elementsBar a', {
    speed: 1000,
    offset: 90
});

//
/********************* Counter js ************************/
//

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  
  var isCounters = document.querySelectorAll(".counter");
  
  isCounters.forEach(function (value) {
    var patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
    var time = 1000;
    var result = [].concat(_toConsumableArray(patt.exec(value.textContent)));
    var fresh = true;
    var ticks;
  
    result.shift();
  
    result = result.filter(function (res) {
      return res != null;
    });
  
    while (value.firstChild) {
      value.removeChild(value.firstChild);
    }
    result.forEach(function (res) {
      if (isNaN(res)) {
        value.insertAdjacentHTML("beforeend", "<span>" + res + "</span>");
      } else {
        for (var i = 0; i < res.length; i++) {
          value.insertAdjacentHTML(
            "beforeend",
            '<span data-value="' +
              res[i] +
              '">\n\t\t\t\t\t\t<span>&ndash;</span>\n\t\t\t\t\t\t' +
              Array(parseInt(res[i]) + 1)
                .join(0)
                .split(0)
                .map(function (x, j) {
                  return "\n\t\t\t\t\t\t\t<span>" + j + "</span>\n\t\t\t\t\t\t";
                })
                .join("") +
              "\n\t\t\t\t\t</span>"
          );
        }
      }
    });
  
    ticks = [].concat(
      _toConsumableArray(value.querySelectorAll("span[data-value]"))
    );
  
    var activate = function () {
      var top = value.getBoundingClientRect().top;
      var offset = window.innerHeight * 0.8;
  
      setTimeout(function () {
        fresh = false;
      }, time);
      if (top < offset) {
        setTimeout(function () {
          ticks.forEach(
            function (tick) {
              var dist = parseInt(tick.getAttribute("data-value")) + 1;
              tick.style.transform = "translateY(-" + dist * 100 + "%)";
            },
            fresh ? time : 0
          );
        });
        window.removeEventListener("scroll", activate);
      }
    };
    window.addEventListener("scroll", activate);
    activate();
  });

  
  
/********* dropdown common js *********/

var dropdownElem = document.querySelectorAll('.dropdown');
var dropupElem = document.querySelectorAll('.dropup');
var dropStartElem = document.querySelectorAll('.dropstart');
var dropendElem = document.querySelectorAll('.dropend');
var isShowDropMenu = false;
var isMenuInside = false;
// dropdown event
dropdownEvent(dropdownElem, 'bottom-start');
// dropup event
dropdownEvent(dropupElem, 'top-start');
// dropstart event
dropdownEvent(dropStartElem, 'left-start');
// dropend event
dropdownEvent(dropendElem, 'right-start');

function dropdownEvent(elem, place) {
    Array.from(elem).forEach(function (item) {
        item.querySelectorAll(".dropdown-toggle").forEach(function (subitem) {
            subitem.addEventListener("click", function (event) {
                subitem.classList.toggle("show");
                var popper = Popper.createPopper(subitem, item.querySelector(".dropdown-menu"), {
                    placement: place
                });

                if (subitem.classList.contains("show") != true) {
                    item.querySelector(".dropdown-menu").classList.remove("block")
                    item.querySelector(".dropdown-menu").classList.add("hidden")
                } else {
                    dismissDropdownMenu()
                    item.querySelector(".dropdown-menu").classList.add("block")
                    item.querySelector(".dropdown-menu").classList.remove("hidden")
                    if (item.querySelector(".dropdown-menu").classList.contains("block")) {
                        subitem.classList.add("show")
                    } else {
                        subitem.classList.remove("show")
                    }
                    event.stopPropagation();
                }

                isMenuInside = false;
            });
        });
    });
}

function dismissDropdownMenu() {
    Array.from(document.querySelectorAll(".dropdown-menu")).forEach(function (item) {
        item.classList.remove("block")
        item.classList.add("hidden")
    });
    Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(function (item) {
        item.classList.remove("show")
    });
    isShowDropMenu = false;
}

// dropdown form
Array.from(document.querySelectorAll(".dropdown-menu")).forEach(function (item) {
    if (item.querySelectorAll("form")) {
        Array.from(item.querySelectorAll("form")).forEach(function (subitem) {
            subitem.addEventListener("click", function (event) {
                if (!isShowDropMenu) {
                    isShowDropMenu = true;
                }
            })
        });
    }
});

// data-tw-auto-close
Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(function (item) {
    var elem = item.parentElement
    if (item.getAttribute('data-tw-auto-close') == 'outside') {
        elem.querySelector(".dropdown-menu").addEventListener("click", function () {
            if (!isShowDropMenu) {
                isShowDropMenu = true;
            }
        });
    } else if (item.getAttribute('data-tw-auto-close') == 'inside') {
        item.addEventListener("click", function () {
            isShowDropMenu = true;
            isMenuInside = true;
        });
        elem.querySelector(".dropdown-menu").addEventListener("click", function () {
            isShowDropMenu = false;
            isMenuInside = false;
        });
    }
});

window.addEventListener('click', function (e) {
    if (!isShowDropMenu && !isMenuInside) {
        dismissDropdownMenu();
    }
    isShowDropMenu = false;
});


/********* modal common js *********/
// openModal
var modalTrigger = document.querySelectorAll('[data-tw-toggle="modal"]');
var isModalShow = false;
Array.from(modalTrigger).forEach(function (item) {
    item.addEventListener("click", function () {
        var target = this.getAttribute('data-tw-target').substr(1);
        var modalWindow = document.getElementById(target);

        if (modalWindow.classList.contains("hidden")) {
            modalWindow.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            modalWindow.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        isModalShow = false;

        if (item.getAttribute('data-tw-backdrop') == 'static') {
            isModalShow = true;
        }
    });
});

// closeButton
var closeButton = document.querySelectorAll('[data-tw-dismiss="modal"]');
Array.from(closeButton).forEach(function (subElem) {
    subElem.addEventListener("click", function () {

        var modalWindow = subElem.closest(".modal");
        if (modalWindow.classList.contains("hidden")) {
            modalWindow.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            modalWindow.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
});

// closeModal
var modalElem = document.querySelectorAll('.modal');
Array.from(modalElem).forEach(function (elem) {

    // modalOverlay
    var modalOverlay = elem.querySelectorAll('.modal-overlay');
    Array.from(modalOverlay).forEach(function (subItem) {
        subItem.addEventListener("click", function () {
            if (!isModalShow) {
                if (elem.classList.contains("hidden")) {
                    elem.classList.remove('hidden');
                    document.body.classList.add('overflow-hidden');
                } else {
                    elem.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }
            }
        });
    });

    // Escape
    document.addEventListener("keydown", function (event) {
        var key = event.key;
        if (!isModalShow) {
            if (key == "Escape") {
                elem.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        }
    });
});

if(document.getElementById('choices-text-remove-button'))
{
    var textRemove = new Choices(
        document.getElementById('choices-text-remove-button'),
            {
            delimiter: ',',
            editItems: true,
            maxItemCount: 5,
            removeItemButton: true,
            }
        );
}

if(document.querySelector('.choices-single-location'))
{
    var singleLocation = new Choices('.choices-single-location');
}

if(document.querySelector('#choices-single-location'))
{
    var singleLocation = new Choices('#choices-single-location');
}

var singleCategorie = document.getElementById('choices-single-categories');
if (singleCategorie) {
    var singleCategories = new Choices('#choices-single-categories');
}
    


// GLightbox Popup

var lightbox = GLightbox({
    selector: '.image-popup'
  });

  // 
// nav-tabs
// 
document.querySelectorAll(".nav-tabs").forEach(function (elem) {
    elem.querySelectorAll('[data-tw-toggle="tab"]').forEach(function (item) {
        item.addEventListener("click", function () {
            var tabID = item.getAttribute("data-tw-target");
            var tabContents = elem.querySelectorAll(".tab-content > .tab-pane");

            var activeElem = elem.querySelector('[data-tw-toggle="tab"].active');
            if (activeElem) activeElem.classList.remove("active");


            // clear value
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.add("hidden");
                tabContents[i].classList.remove("block");
            }

            // change value
            item.classList.add("active");
            document.getElementById(tabID).classList.remove("hidden");
            document.getElementById(tabID).classList.add("block");
        });
    });
});


// 
// accordion
// 
document.querySelectorAll('[data-tw-accordion="collapse"]').forEach(function (elem) {
    elem.querySelectorAll(".accordion-item").forEach(function (item) {
        item.querySelector(".accordion-header").addEventListener("click", function (event) {
            item.querySelector(".accordion-header").classList.toggle("active");

            if (item.querySelector(".accordion-header").classList.contains("active") != true) {
                item.querySelector(".accordion-body").classList.remove("block")
                item.querySelector(".accordion-body").classList.add("hidden")
            } else {
                dismissCollapse(elem)
                item.querySelector(".accordion-body").classList.add("block")
                item.querySelector(".accordion-body").classList.remove("hidden")
                if (item.querySelector(".accordion-body").classList.contains("block")) {
                    item.querySelector(".accordion-header").classList.add("active")
                } else {
                    item.querySelector(".accordion-header").classList.remove("active")
                }
                event.stopPropagation();
            }
        });
    });
});

function dismissCollapse(test) {
    Array.from(test.querySelectorAll(".accordion-body")).forEach(function (item) {
        item.classList.remove("block")
        item.classList.add("hidden")
    });
    Array.from(test.querySelectorAll(".accordion-header")).forEach(function (item) {
        item.classList.remove("active")
    });
}



/************** Testimonial Slider *************/
var swiper = new Swiper(".testimonialSlider", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        200: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 1,
            spaceBetween: 20,
        }
    }
});

var swiper = new Swiper(".homeslider", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    
});


// ltr-rtl
var isChangeMode = document.getElementById("ltr-rtl");
if (isChangeMode) {
    isChangeMode.addEventListener("click", function (e) {
        var themeMode = document.querySelector('[data-theme-color]').getAttribute("dir");
        if (themeMode == "ltr") {
            document.querySelector('[data-theme-color]').setAttribute("dir", "rtl");
        } else {
            document.querySelector('[data-theme-color]').setAttribute("dir", "ltr");
        }

        swiperDir();
    });
}


// Swicher
function toggleSwitcher() {
    var i = document.getElementById('style-switcher');

    if (!i.classList.contains("show")) {
        i.classList.add("show")
    } else {
        i.classList.remove("show")
    }
};

// Light-dark
var isChangeMode = document.getElementById("mode");
if (isChangeMode) {
    isChangeMode.addEventListener("click", function (e) {
        var themeMode = document.querySelector('[data-theme-color]').getAttribute("data-mode");
        if (themeMode == "light") {
            document.querySelector('[data-theme-color]').setAttribute("data-mode", "dark");
        } else {
            document.querySelector('[data-theme-color]').setAttribute("data-mode", "light");
        }
    });
}

// data-theme-color
document.querySelectorAll("#style-switcher li").forEach(function (item) {
    var layoutGetAttr = item.querySelector("a").getAttribute("data-color")
    if (sessionStorage.getItem("data-theme-color") && sessionStorage.getItem("data-theme-color") == layoutGetAttr) {
        document.querySelector('[data-theme-color]').setAttribute('data-theme-color', layoutGetAttr);
    }
    if (document.querySelector('[data-theme-color]').getAttribute('data-theme-color') == layoutGetAttr) {
        item.querySelector("a").classList.add("active");
    }
    item.querySelector("a").addEventListener("click", function () {
        sessionStorage.setItem("data-theme-color", layoutGetAttr);

        if (sessionStorage.getItem("data-theme-color") && sessionStorage.getItem("data-theme-color") == layoutGetAttr) {
            document.querySelector('[data-theme-color]').setAttribute('data-theme-color', layoutGetAttr);
        }
        // link active
        var themecolorList = document.querySelector("#style-switcher li a.active");
        if (themecolorList) themecolorList.classList.remove("active");
        this.classList.add("active");
    })
})

    




