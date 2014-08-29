/*! rakugaki-box.net */

!function($) {

    // PC向けページのみ適用する
    if (!/^pc$/i.test($("html").data("device"))) {
        return;
    }

    // 外部リンクは別ウィンドウで開く
    $(document).on("click contextmenu touchstart",
        "a[href^=http]:not([target]):not([href*='" + location.hostname + "'])",
        function(event) { $(event.currentTarget).attr("target", "_blank"); }
    );

}($);
