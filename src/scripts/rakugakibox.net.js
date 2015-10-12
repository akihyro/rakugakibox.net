/*!===================================================================================================================
 * rakugakibox.net
 *====================================================================================================================*/

var $ = require("jquery");

// 外部リンクは別ウィンドウで開く
$(document).on(
    "click contextmenu touchstart",
    "a[href^=http]:not([target]):not([href*='" + location.hostname + "'])",
    function(event) {
        $(event.currentTarget).attr("target", "_blank");
    }
);

// アイキャッチイメージリンクはエントリページを開く
$(document).on(
    "click contextmenu touchstart",
    "#main .entry .entry-inner .entry-content > p:first-child span[itemtype='http://schema.org/Photograph'] a",
    function(event) {
        var target = $(event.currentTarget);
        var title = target.parents(".entry-inner").first().find(".entry-header .entry-title a");
        if (title) {
            target.attr("href", title.attr("href"));
            target.removeAttr("target");
        }
    }
);
