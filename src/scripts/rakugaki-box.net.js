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

    // エントリイメージのリンクはエントリページを開く
    $(document).on("click contextmenu touchstart",
        "#main .entry .entry-content p:first-child span[itemtype='http://schema.org/Photograph'] a",
        function(event) {
            var target = $(event.currentTarget);
            var title = target.parents(".entry").first().find(".entry-title a");
            if (title) {
                target.attr("href", title.attr("href"));
                target.removeAttr("target");
            }
        }
    );

}($);
