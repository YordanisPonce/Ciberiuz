function responsiveDesign() {
    let divAll = document.querySelectorAll(".pc_view_artist div.col-2");
    divAll = Array.from(divAll);
    let fuctionRemove = () => {
        if ($(window).width() < 767 && $(window).width() > 300) {
            //divAll[divAll.length - 1].classList.add("d-none");
            for (let i = 0; i < divAll.length; i++) {
                if (i == 4 || i == 9 || i == 14) {
                    divAll[i].classList.add("d-none");
                }

            }
        } else if ($(window).width() < 300) {
            $(".pc_view_artist").removeClass("d-flex");
        }
        else if ($(window).width() > 767) {
            // divAll[divAll.length - 1].classList.remove("d-none");
            for (let i = 0; i < divAll.length; i++) {
                if (i == 4 || i == 9 || i == 14) {
                    divAll[i].classList.remove("d-none");
                }

            }
        }
    }
    fuctionRemove();
    $(window).resize(() => {
        fuctionRemove();
    });


}
function enabledPopoverGenre(data) {
    $(".genre").attr("data-bs-content", data);
    var popoverTriggerList = [].slice.call(document.querySelectorAll('.genre'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
}

function setAnimation() {
    let elements = [];
    $(".artist img").each(function (index, element) {
        elements.push(element);

    });
    setInterval(() => {
        let index = parseInt(Math.random() * elements.length);
        elements[index].classList.add("animation");
        setTimeout(() => {
            elements[index].classList.remove("animation");
        }, 1000);
    }, 5000);
}
