// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
// ここでもcssのとき同様、require_tree . で全てのスクリプトを読み込んでいる
//= require jquery
//= require jquery_ujs
//= require_tree .


// リロード、ウィンドウサイズ変更時のコールバック
jQuery.event.add(window, "load", resizeOrReload);
jQuery.event.add(window, "resize", resizeOrReload);

var window_height = 0;
var window_width = 0;
var contact_padding_height = 0;

// リロード、ウィンドウサイズ変更時のコールバックの実装
function resizeOrReload() {
  window_width = $(window).width();
  window_height = $(window).height();
  
  $("nav").css("height", window_height - 60);
  $("#gamepage").css({"width":window_width - 202, "height":window_height - 40});
  $("#map-canvas").css({"width":window_width - 202, "height":window_height - 40});
}

/*
$(".mordal").click(function() {
  
});
*/