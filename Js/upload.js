function changedBackground(counter) {
    let colors = [
        `#25363F`,
        `#75C19D`,
        `#742137`,
        `#692579`,
        `#29C4DC`,
        `#F9796A`,
        `#51B962`,
        `#EFB331`,
        `#C6A0CC`,
        `#7F91A3`,
    ];
    $(`.changed-background`).click(function (e) {
        $(`.background-container`).css("background-color", colors[counter]);
        counter++;
        if (counter > colors.length - 1) {
            counter = 0;
        }
    });

}
function changeFontStyle(counter) {
    let styles = [
        `roboto`,
        `action-jackson`,
        `bebas-neue`,
        `caviar-dreams`,
        ` little-days`,
    ];
    $(".changed-text-style").click(function (e) {
        e.preventDefault();
        $("#editable-tag").css('font-family', styles[counter]);
        $(this).css('font-family', styles[counter]);
        counter++;
        if (counter > styles.length - 1) {
            counter = 0;
        }
    });

}

function textArea() {
    let element = document.getElementById("editable-tag");
    let htmlContent = element.innerHTML;
    element.addEventListener("keydown", e => {
        let value = e.keyCode;
        if (!first) {
            $(element).html("");
            first = true;
        }
    });
    element.addEventListener("keyup", e => {
        if (element.textContent == '') {
            $(element).html(htmlContent);
            first = false;
        }
    });
}


function confirmPost() {
    if (confirm("¿Desea agregar un nuevo post?")) {
        let background = $(`.background-container`).css("background-color");
        let text = $("#editable-tag").text();
        let idsSongs = $("#ids").val();

        if ($("#editable-tag").find("span").length != 0 || idsSongs.length == 0) {
            document.getElementById("liveToastBtn").onclick = function () {
                showToast();
            };
            $("#liveToastBtn").click();
            return;
        }


        $("#song-background").val(background);
        $("#song-topic").val(text);
        $("#to-post").submit();
    }
}

function replaceText(element) {
    if (!first) {
        $(element).html("");
        first = true;
        $(element).removeClass('text-muted');
    } else if (first && $(element).html() == "") {
        $(element).html("<p>HOla mundo</p>");
    }
}
function showToast() {
    var myAlert = document.getElementById('liveToast');//select id of toast
    var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
    bsAlert.show();//show it
}



function searching(e) {
    //Rescatando los nombres
    $(`.row label`).each(function (index, element) {
        if (element.textContent.toLowerCase().indexOf($(e).val().toLowerCase()) !== -1) {
            $(this).closest("div.row").show();
        } else {
            $(this).closest("div.row").hide();
        }
    });
}

//---------------------Selected songs-----------------------------------------------------

function countSelectedSongs() {
    let counter = 0;
    $(`input[type='checkbox']`).each(function (index, element) {
        // element == this
        if (element.checked == true) {
            counter++;
        }

    });
    $("#selectedSong").text(counter);
}
function amountCheckedInputs() {
    let ids = [];
    $(`input[type='checkbox'`).each(function (index, element) {
        // element == this
        if (element.checked == true) {
            ids.push(element.value);
        }
    });
    $(`#ids`).val(ids.join(","));
}

function clickElement(element){
 $(element).closest("p").focus();

}