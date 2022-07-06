function responsiveDesign() {

    let fuctionRemove = () => {
        if ($(window).width() < 315) {
            $(".loginContainer").removeClass("px-5");
            $(".loginContainer").addClass("px-1");
        }
        else {
            $(".loginContainer").removeClass("px-1");
            $(".loginContainer").addClass("px-5");
        }
    }
    fuctionRemove();
    $(window).resize(() => {
        fuctionRemove();
    });
}

function setClickImage() {
    $("figure img").each(function (index, element) {
        // element == this
        element.addEventListener("click", e => {
            $("#form-register").fadeIn();
            $("#type").addClass("d-none");
            console.log();
            if (e.target.id != "img-user") {
                $("#artist-name").removeClass("d-none");
                $("#artist-name input").attr("required", true);
            }
        })
    });
}