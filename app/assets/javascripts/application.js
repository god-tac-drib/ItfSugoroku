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


jQuery(document).ready(function($){ // prototype.js汚染回避。これに加え読み込み順はprototypeが先でjQueryが後の必要があるので、prototypeはpolution_escapeディレクトリを作成し隔離、require_tree . で読み込まれないようにして、html側でjavascript_link_tagでapplication.jsの前に呼び出す。今回はjesterでprototypeが必要なので。←結局使用しなかった
/////////////
// 基本設定 //
/////////////

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
    
    $("nav").css("height", window_height - 140);
    $("#gamepage").css({"width":window_width - 202, "height":window_height - 40});
    $("#map_canvas").css({"width":window_width - 202, "height":window_height - 40}); // htmlタグにwidth, heightが明記されていないと、googleMapが表示されないため
    
    $(".modal").css({"width":window_width, "height":window_height});
    $(".modalWindow").css({"top":window_height / 2 - 200, "left":window_width / 2 - 300});
  }
  
  
  // railsであってもこの書き出しは必須。
  $(document).ready(function(){
  
    function hideModal() {
      console.log("close modal");
      $(".modal").css({"display":"none", "z-index":"-9999"});
      $(".modal").contents().css({"display":"none", "z-index":"-9999"});
      $(".modalWindow_contentts").contents().remove(); // モーダルを閉じたら描画内容を削除
    }
    function showModal() {
      console.log("show modal");
      $(".modal").css({"display":"block", "z-index":"9998"});
      $(".modal").contents().css({"display":"block", "z-index":"9999"});
    }
    
    jQuery.event.add(window, "load", hideModal);
    
    $(".hideModalButton").click(function() {
      hideModal();
    });
  
  });
  
});