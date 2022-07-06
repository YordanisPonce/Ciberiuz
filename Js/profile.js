function btnAmount(amount) {
    if (amount < 3) {
        $(`.nav-tabs li`).css(`width`,`50%`);
    }else{
        $(`.nav-tabs li`).css(`width`,`33.3%`);
    }
}