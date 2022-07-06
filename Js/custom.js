function responsiveDesign() {
    let container = $("#home");
    if ($(window).width() <= 368) {
        $(".cell_view_artist").removeClass("d-none");
    }
    if ($(this).width() <= 575) {
        container.removeClass("bg-white");
    } else {

        container.addClass("bg-white");
    }
    if ($(this).width() <= 368) {
        $(".cell_view_artist").removeClass("d-none");
    } else {
        $(".cell_view_artist").addClass("d-none");
    }
    $(window).resize(() => {
        //Background of container
        if ($(this).width() <= 575) {
            container.removeClass("bg-white");
        } else {
            container.addClass("bg-white");
        }
        //list of users 

        if ($(this).width() <= 368) {
            $(".cell_view_artist").removeClass("d-none");
        } else {
            $(".cell_view_artist").addClass("d-none");
        }

    });
}

//-----------------Dando funcionalidad a los paquetes-------------------------------------
var counter = 4;
var cont = 0;
var basicType = 0;
function sendTypePackage(packageType, month, value, list) {
    let type = ``;
    let src = ``;
    if (packageType == 1) {
        type = "Básico";
        basicType = 1;
        src = $("#basic-package").attr("src");
        //Imagen, nombre, duracion, valor

    } else if (packageType == 2) {
        type = "Pro";
        basicType = 2;
        src = $("#pro-package").attr("src");
    } else if (packageType == 3) {
        type = "Golden";
        basicType = 3;
        src = $("#golden-package").attr("src");
    }
    //Ojo con esta linea de codigo, si la quito el formulario no avanza
    $("#pacakges_type").val(type);
    //Ojo con esta linea de codigo
    //Construyendo la vista con toda la info del paquete a comprar
    $("#name_pkg").text(type);
    for (const iterator of list) {
        $("#list_offers").append(`<li>${iterator}</li>`);
    }
    $("#img_package").attr("src", src);
    $("#month").text(month);
    $("#value").text(value);
    $("#transfer_amount").text(value);

}
function replaceInputGroup(cont) {
    let controller = false;
    $(`.input-group-${cont} input`).each(function (index, element) {
        if (element.value == "") {

            controller = true;
        }
        console.log(element.value);
    });
    if (!controller) {
        if (cont == 0) {
            $(`.input-group-${cont}`).addClass("d-none");
            $(`.input-group-${cont + 1}`).removeClass("d-none");
        } else if (cont == 1) {
            $(`.input-group-${cont}`).addClass("d-none");
            $(`.input-group-${cont + 1}`).removeClass("d-none");

        } else if (cont == 2) {
            $(`.input-group-${cont}`).addClass("d-none");
            $(`.input-group-${cont + 1}`).removeClass("d-none")
            $(`#continue`).text("Aceptar");
        } else {
            $("#form-modal").modal(`hide`);
            getPackage(basicType);
        }

    }

    return controller;
}
//Datos para enviar al backend y comprar el paquete
//El parametro type indica el tipo de paquete a escoger
function getPackage(type) {
    console.log(type);
    const toast = (message, title, icon) => {
        $(".toast-body").html(`<p>${message}</p>`);
        $(".title-toast").text(title);
        if (icon == "danger") {
            $(".header-toast-color").addClass("text-danger");
        } else {
            $(".header-toast-color").addClass("text-success");
        }
        var myAlert = document.getElementById('liveToast');//select id of toast
        var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
        bsAlert.show();//show it
    }
    $("#form_packages").submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: "post",
            url: "/url/" + type,
            data: data,
            dataType: "json",
            success: function (response) {
                toast("Transacción realizada de manera satisfactoria", "Transacción completada", "success");
            },
            error: function (response) {
                toast("Fallo al realizar la transacción", "Transacción fallida", "danger");
            }
        });

    });
    $("#form_packages").submit();
}
function separateString(element) {
    if (element.value.length == counter) {
        element.value += " ";
        counter += 5;
    }
}
//-----------------Habilitando el popover-------------------------------------
function enabledPopover(notifications) {
    $(".fa-bell").attr("data-bs-content", notifications);
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
}
//-----------------Color rojo al corazon---------------------------------------------------------

function likeMe(element) {
    if ($(element).hasClass("far")) {
        $(element).removeClass("far text-dark");
        $(element).addClass("fa text-danger");
        sendRequest({ like: 1 }, "/like", "POST");
    } else {
        $(element).removeClass("fa text-danger");
        $(element).addClass("far text-dark");
        sendRequest({ like: -1 }, "/like", "POST");
    }
}

//-----------------Cambiar icono play y pause a las canciones-------------------------------------

function setIconPlayPause(element) {
    if ($(element).hasClass("fa-play-circle")) {
        $(element).removeClass("fa-play-circle");
        $(".fa-pause-circle").each(function (index, element) {
            $(this).removeClass("fa-pause-circle");
            $(this).addClass("fa-play-circle");
        });
        $(element).addClass("fa-pause-circle");
    } else if ($(element).hasClass("fa-pause-circle")) {
        $(element).removeClass("fa-pause-circle");
        $(element).addClass("fa-play-circle");
    }
}

//-----------------Cambiar seguir y siguiendo en las sugerencias de artistas-------------------------------------

function setFollowUnfollow(element, id, idAuth) {
    //Esta linea me da si tengo el boton de seguir
    if ($($(element).children()).is("button")) {
        let btnFollow = `<p class="follow-artist"><i class="fa fa-check"></i> Siguiendo</p>`
        $(element).html(btnFollow);
        sendRequest({ follow: true, idAuth: idAuth }, "/follow", "POST", id);
    } else {
        let btnFollow = `<button type="button" class="btn btn-secondary btn-sm">Seguir</button>`
        $(element).html(btnFollow);
        sendRequest({ follow: false, idAuth: idAuth }, "/follow", "POST", id);
    }
}

function sendRequest(value, url_database, method, id = -1) {
    if (id == -1) {
        console.log("Debe seleccionar un elemento");
    } else {
        $.ajax({
            type: method,
            dataType: "json",
            url: url_database / id,
            data: value,
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                console.log(response);
            }
        });
    }

}
function showNotifications(url) {
    let notifications = Cookies.get('notifications');
    let values = `<div class="container-fluid">`;
    if (typeof notifications !== 'undefined') {
        notifications = notifications.split('$');
        for (const element of notifications) {
            values += `
    <a href="${url}" class="data_notifications row py-1">
    <img src="../assets/bad-bunny-gq-april-2019.jpg" alt="" width="40" height="40" class="rounded-circle col-3"> 
    <span class="col-9 d-flex align-items-center">${element}</span></a>`;
        }

        values += `
    <hr class="dropdown-divider">
    <a href="${url}" class="data_notifications btn_more_notifications btn" >Ver m&aacute;s</a> </div>`;
    } else {
        values += `<a href="${url}" class="data_notifications  row py-1">
    <i class="far fa-bell-slash col-3  d-flex align-items-center empty"></i>
    <span class="col-9 d-flex align-items-center">Sin notificaciones recientes en el sistema</span></a> </div>`;
    }
    enabledPopover(values);
}

function sendFavoritesGenders(url) {
    // Select musical genders logic
    // ------------------Esta linea es para quitarle el scroll al fondo que se ve, mucho ojo al usarla
    document.querySelector('body').className += 'overflow-hidden'
    // ----------------------------------------------------------
    document.getElementById('musicalGendersModal').classList.add('show')
    document.getElementById('musicalGendersModal').classList.add('d-block')

    const element = document.getElementsByClassName('fav-musical-gender')
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', () => {
            if (element[i].className.indexOf('fav-musical-gender-selected') === -1) element[i].className += ' fav-musical-gender-selected'
            else element[i].className = 'fav-musical-gender m-2 col-4 col-md-3 d-flex justify-content-center align-items-center rounded-circle'
        })
    }

    // Accept musical genders method
    const acceptGendersButton = document.getElementById('acceptGendersButton')
    acceptGendersButton.addEventListener('click', () => {
        if (musicalGenders().length === 0) {
            showToast();
            return;
        }

        let data = musicalGenders()
        fetch(url, {
            method: 'POST',
            body: {
                data
            }
        })
        document.body.classList.remove('overflow-hidden');
        document.getElementById('musicalGendersModal').classList.remove('show')
        document.getElementById('musicalGendersModal').classList.remove('d-block')
        Cookies.set("genders", true, { expires: 5 });
    })

    // To return the selected genders
    const musicalGenders = () => {
        let genders = [];
        for (let i = 0; i < element.length; i++) {
            if (element[i].className.indexOf('fav-musical-gender-selected') !== -1) {
                genders.push(element[i].id)
            }

        }
        return genders;
    }
    //END Select musical genders logic
}

function showToast() {
    var myAlert = document.getElementById('liveToast');//select id of toast
    var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
    bsAlert.show();//show it
}
