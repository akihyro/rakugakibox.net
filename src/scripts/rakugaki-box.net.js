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

    // ホバー時に専用のクラスを割当てる
    // ※スマートフォンでは CSS ":hover" がタッチ開始～終了のタイミングで適用されない為、独自実装する。
    // ※マウスイベント/タッチイベント両方が発行された場合は、タッチイベントを優先する。
    $(document).on("mouseenter", "a",
        function(event) {
            var target = $(event.currentTarget);
            if (!target.hasClass("rbox-touch-hover")) {
                target.addClass("rbox-mouse-hover");
            }
        }
    );
    $(document).on("mouseleave", "a",
        function(event) {
            var target = $(event.currentTarget);
            target.removeClass("rbox-mouse-hover");
        }
    );
    $(document).on("touchstart", "a",
        function(event) {
            var target = $(event.currentTarget);
            target.addClass("rbox-touch-hover");
        }
    );
    $(document).on("touchend touchcancel", "a",
        function(event) {
            var target = $(event.currentTarget);
            target.removeClass("rbox-touch-hover");
        }
    );

}($);
