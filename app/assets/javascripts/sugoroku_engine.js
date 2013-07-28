//////////////////
// ゲームエンジン //
//////////////////

// DOMが全てロードされてから実行
//document.addEventListener('DOMContentLoaded', function() { // jsでの書き方。jqueryでは下記で代用できる。prototypeの汚染回避が必要な場合は特に下記を使用する
jQuery(document).ready(function($){
  var mapCanvas;
  var zoneList; // マップ
	var yuruZone;	//ゆるキャラのでるマス
  var surroundHex = new Array(); // サイコロで到達可能なすべてのマス。マップは無視の最短距離範囲
  var routeHex = new Array(); // マップで実際に移動可能なマス。この時点では最短距離。surrounHexのうち設定したルートに含まれるマス
  var traceHex = new Array(); // コード・現在地からの距離がセットの２次元配列。routeHexに含まれるコードとその現在地からの距離を持つ二次元配列
  var restHex = new Array(); // traceHexに一度目で入らないマスを入れておく
  var mobileHex = new Array(); // 最短では到達できない迂回の必要を考慮したマス。
  var stepCode = new Array(); // traceHexに含まれるコードにアクセスしやすくする
  var marker; //プレイヤー
  var streetViewPanorama;
  var streetViewOptions;
  var playerZone; //プレイヤーの現在地
  var level = 9;
  var flg = 0; // 現在が移動フェーズであるかの判断。連続移動などを防止。一度移動したら各パラメータを初期化するための判断材料
  var count;
	var icon;	// 天気のアイコンの種類
	var play = 0;	// 一度さいころを振ったら移動するまでサイコロを振れないようにするための変数
	
	var ajaxReturnValue;
  
  // 初期化
  function initialize(){
  	//地図を作成する
    var mapDiv = document.getElementById("map_canvas");
    mapOptions = {
  		center : new google.maps.LatLng(44.384526, 142.438110),
  		zoom : 7,
			//maxZoom: 8,
			//minZoom: 6,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			zoomControl: false,
			panControl: false,
			//scrollwheel: false,
			streetViewControl: false
    };
    mapCanvas = new google.maps.Map(mapDiv,mapOptions);
  
  	//マス目のzoneコード
    zoneList = new Array("jkcS9","jkcQB","jkcOD","jkcMF","jkcKH","jkcIJ","jkcGL","jkcEN","jkcCN","jkcAN","jkc8N","jkc8L","jkc6L","jkc4N","jkc2P","jkc0R","jkc2R","jkc2T","jkcyT","jkc0V","jkcOF","jkcOH","jkcOJ","jkcOL","jkcON","jkcOP","jkcOR","jkcMT","jkcKT","jkcIT","jkcGT","jkcET","jkcCT","jkcCR","jkcCP","jkcKJ","jkcKL","jkcKN","jkcIP","jkcGR","jkcMN","jkcwV","jkcuX","jkdsb","jkc0X","jkdyb","jkdwd","jkdqd","jkdof","jkdmh","jkdkj","jkdqd","jkdud","jkdsf","jkdqh","jkdoj","jkdqd","jkdml","jkdwf","jkduh","jkdsj","jkdql","jkdon","jkdmp","jkdil","jkdgn","jkdep","jkdcr","jkdar","jjdWt","jkdkn","jkdkp","jkdip","jkdgr","jkdet","jkdap","jjdWp","jjdUv","jjdSv","jjdQv","jjdOv","jjdMx","jjdMz","jkdcv","jkdax","jjdWz","jjdUz","jjdS1","jjdQ1","jjdO3","jjdM3","jjdK5","jjdK3","jjdI5","jjdK1","jjdQz","jjdQx","jjdUp","jjdSr","jjdQt","jjdI1","jjdG1","jjdE3","jjdC3","jjdA3","jjd85","jjd83","jjd81","jjdGz","jjdIx","jjdKv","jjdMt","jjdOr","jjdQr","jjd8z","jjdAx","jjdCv","jjdEv","jjdGt","jjdIr","jjdKr","jjdMr","jjdKp","jjdKn","jjdMl","jjdOl","jjdGr","jjdEr","jjdCt","jjdAt","jjd8x","jjd8v","jjd8x","jjd6v","jjd6t","jjd4t","jjd4r","jjd6z","jjd41","jjd23","jjd03","jjdy3","jjdy1","jjdyz","jjd0x","jjd2x","jjd2z","jjd0v","jjd0t","jjdyt","jjdwt","jjdut","jjdur","jjdsr","jjdqr","jjdor","jjdop","jjd4p","jjd2p","jjd0r","jjd2n","jjd0n","jjdyn","jjdwn","jjdun","jjdsn","jjdqn","jjdwv","jjdux","jjdwz","jjduz","jjds1","jjdq1","jjdsx","jjdqz","jjdqx","jjdqv","jjdox","jjdoz","jjdm1","jjdk1","jjdkz","jjdmx","jjdmp","jjdkp","jjdir","jjdgr","jjder","jjdcr","jjdct","jjdav","jjdcp","jjdap","jidWr","jidUr","jjdit","jjdgv","jjdev","jjdcx","jjdaz","jidWz","jidU1","jjdgx","jjdez","jjdc1","jjda3","jidW3","jidU5","jidS5","jidQ7","jidO9","jidM9","jidK9","jidIB","jidGB","jidED","jidCF","jidAH","jid8H","jid6J","jid4J","jid2J","jid0L","jidyL","jidwN","jiduN","jidsN","jidsP","jidqP");
    yuruZone = new Array("jkcEN","jkdsb","jkdsf","jkdoj","jkdmp","jkdar","jjdWt","jjdWp","jjdOz","jjdO3","jjdMx","jjdK5","jjdMz","jjdI5","jjdK3","jjdG1","jjdIx","jjd85","jjd81","jjdAx","jjdEr","jjdKp","jjdAt","jjd8x","jjd4t","jjd0x","jjd2x","jjd2z","jjd6z","jjdyz","jjd0r","jjd0n","jjdop","jjd2n","jjdsr","jjdqv","jjduz","jjdwv","jjdqz","jjdgr","jjder","jidWr","jjdev","jjdgv","jjda3","jidS5","jidsP");
    
    playerZone = GeoHex.getZoneByCode(zoneList[0]);
    
  	//マーカー(プレイヤーのコマ)の作成
    marker = createMarker({
  		position: new google.maps.LatLng(playerZone.lat,playerZone.lon),
  		map: mapCanvas
    });
  
  	//ストリートビューオブジェクトの作成
    var streetViewDiv = document.getElementById("streetview_canvas");
    streetViewOptions = {
  		position: new google.maps.LatLng(playerZone.lat, playerZone.lon),	//プレイヤーの位置にしたい
			linksControl: false,
			scrollwheel: false,
			zoomControl: false,
			enableCloseButton: true,
			panControl: false
    };
    streetViewPanorama = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);
    
    //近くのストリートビューを取得
    var client = new google.maps.StreetViewService();
    client.getPanoramaByLocation(streetViewOptions.position, 100000, function(result, status) {
  	  //alert(status);
  	  if(status == google.maps.StreetViewStatus.OK){
  		  var nearestPano   = result.location.pano;
  		  var nearestLatLng = result.location.latLng;
  		  streetViewPanorama.setPosition(nearestLatLng);
  	  }
    });
    
    //天気の各パラメータを取得
  	var url = "http://openweathermap.org/img/w/";
  	var png = ".png";
  	getWeather(function (data) {
      console.log('weather data received');
      console.log(data.weather[0].description);
  		var icon = data.weather[0].icon;
  		var iconUrl = url + icon + png;
  		document.weather.src=iconUrl;
  	});
    
  	//ヘックスを描画。日本にマッピング
    for(var i=0 ; i < zoneList.length ; i++){
  		var zone = GeoHex.getZoneByCode(zoneList[i]);
  		zone.drawHex(mapCanvas, { linecolor: "#FF0000", fillcolor: "#FF8a00" ,popinfo:0});
    }
    
    //こいつ走らせると何故かyuruzoneがundefinedで、geoHexのcore側でjs標準のメソッドがundefinedに対して呼べないよってエラー吐く
    // ゆるキャラゾーン色反転
    for(var i=0 ; i < yuruZone.length ; i++){
     var zone = GeoHex.getZoneByCode(yuruZone[i]);
     zone.drawHex(mapCanvas, { linecolor: "#FF0000", fillcolor: "#00FF00" ,popinfo:0});
    }
    
    // jsからのrails問い合わせ非同期通信のテスト
    // 非同期通信に使用するパラメータを設定。通信完了時に実行される処理をコールバック関数として指定。
    // 下記のajax関数の後の行にそのまま続けて処理を書いてしまうのはNG。何故なら、行っている処理は非同期通信なので、その結果が返ってくる前に次の行がインタプリットされてしまうという当たり前だが致命的なことが起こるため。だから後処理は、通信完了にトリガーされるコールバックの形で実装しそれを指定してやる必要がある。
    var params = { accessType:"read", model:"User", id:1, attrToReadOrWrite:"id", callbackFunktion:"testCallback" };
    readModelWithAjax(params); // 非同期通信を実行。この後の処理は実質コールバックとして呼び出される関数で実行される
  }
  

  // 天気情報の取得
  function getWeather(callback) {
    var url1 = "http://api.openweathermap.org/data/2.5/weather?lat=";
    var url2 = "&lon=";
    var url3 = "&callback=test&cnt=1";
    var weather = url1 + playerZone.lat + url2 + playerZone.lon + url3;
    $.ajax({
      dataType: "jsonp",
      url: weather,
      success: callback
    });
  }
  
  //マーカーを作る関数
  function createMarker(opts){
    var marker = new google.maps.Marker(opts);
    return marker;
  }
  
  
  // サイコロボタン
  $(".saikoro").click(function() {
    dice();
  });
  //サイコロの目の計算とアラート
  function dice(){
    if(play == 0){	//サイコロを振って移動していない場合実行しない
    	if(flg == 0){
    		var num = (Math.floor(Math.random()*10))+1;
    		// 移動をはじめる
    		// 天候影響
  			getWeather(function (data) {
	  	    console.log('weather data received');
	  	    console.log(data.weather[0].description);
  				icon = data.weather[0].icon;
  				console.log(icon);
		  	});
				if(icon == "11d" || icon == "11n"){
					if(num == 10){
						window.alert(num + "の目が出ました。雷雨のため進めるマスが９マス減ります");
						num -= 9;
						move(num);
					}else{
						window.alert(num + "の目が出ました。目が少なく雷雨のため進めません");
					}
				}else if(icon == "10d" || icon == "10n"){
					if(num > 3){
						window.alert(num + "の目が出ました。雨のため進めるマスが３マス減ります");
						num -= 3;
						move(num);
					}else{
						window.alert(num + "の目が出ました。目が少なく雨のため進めません");
					}
				}else if(icon == "13d" || icon == "13n"){
					if(num > 5){
						window.alert(num + "の目が出ました。雪のため進めるマスが５マス減ります");
						num -= 5;
						move(num);
					}else{
						window.alert(num + "の目が出ました。目が少なく雪のため進めません");
					}
				}else if(icon == "50d" || icon == "50n"){
					var rand = Math.floor(Math.random()*10);
					if(num > rand){
						window.alert(num + "の目が出ました。視界が悪いため進めるマスが" + rand + "マス減りました");
						num -= rand;
						move(num);
					}else{
						window.alert(num + "の目が出ました。目が少なく視界が悪いため進めません");
					}
				//天気が雷雨、雨、雪、霧でない場合
				}else{
				  window.alert(num + "の目が出ました。天候は問題ありません");
					move(num);
				}
    	}else{	//二度目以降は各種変数を初期化
				mobileHex.length = 0;
				surroundHex.length = 0;
				stepCode.length = 0;
				routeHex.length = 0;
				traceHex.length = 0;
				restHex.length = 0;
				flg = 0;
				num = 0;
				dice();
    	}
    }
  }
  
  //サイコロの目から移動処理
  function move(num){
		play = 1;
  	var loopNum = 0;
  	var tmpHex = new Array();
  
  	for(var i = 1 ; i<num ; i++){
  		loopNum += (6*i);
  	}
  	if(num <= 2){
  		loopNum -= 1;
  	}
    
  	var hex1 = GeoHex.getZoneByXY(playerZone.x+1, playerZone.y, level);	//zoneはプレイヤーの止まっているマス
  	var hex2 = GeoHex.getZoneByXY(playerZone.x-1, playerZone.y, level);
  	var hex3 = GeoHex.getZoneByXY(playerZone.x, playerZone.y+1, level);
  	var hex4 = GeoHex.getZoneByXY(playerZone.x, playerZone.y-1, level);
  	var hex5 = GeoHex.getZoneByXY(playerZone.x+1, playerZone.y+1, level);
  	var hex6 = GeoHex.getZoneByXY(playerZone.x-1, playerZone.y-1, level);
  
  	surroundHex.push(hex1.code);
  	surroundHex.push(hex2.code);
  	surroundHex.push(hex3.code);
  	surroundHex.push(hex4.code);
  	surroundHex.push(hex5.code);
  	surroundHex.push(hex6.code);
  	traceHex.push(new createTraceHex(playerZone.code,0));
  	stepCode.push(playerZone.code);
  
  	for(var j = 0; j <= loopNum; j++){	
  		calcSurroundHex(surroundHex[j],surroundHex);
  	}
  	for(var i = 0; i < surroundHex.length ;i++){
  		if((zoneList.indexOf(surroundHex[i]) != -1) && (routeHex.indexOf(surroundHex[i]) == -1)){
  			routeHex.push(surroundHex[i]);
  		}
  	}
  	for(var i =0; i < routeHex.length ; i++){
  		count = 0;
  		countStep(routeHex[i],tmpHex);
  		if(count == 0){
  			restHex.push(routeHex[i]);
  		}
  	}
  	
  	restHex.some(function(v,i){
  		if(v==playerZone.code)restHex.splice(i,1);
  	});
    
  	count = 0;
  	var countFlg = 1;
  	while(count != countFlg){
  		countFlg = count;
  		for(var i = 0;  i < restHex.length; i++){
  			countStep(restHex[i],tmpHex);
  		}
  	}
  	for(var i = 0; i < stepCode.length;i++){
  		if(traceHex[i].step <= num){
  			mobileHex.push(traceHex[i].code);
  		}
  	}
  	if(num == 0){
  		mobileHex.length = 0;
  	}
  	
  	mobileHex.some(function(v,i){
  		if(v==playerZone.code)mobileHex.splice(i,1); //プレイヤーは現在地から必ず移動しなければならない
  	});
  	
  	for(var j = 0; j < mobileHex.length ;j++){
  		var zone = GeoHex.getZoneByCode(mobileHex[j]);
  		var hexPolygon = zone.drawHex(mapCanvas, { linecolor: "#0000FF", fillcolor: "#0000FF" ,popinfo:0}); // ここでhexPolygonに正しくオブジェクトが入っておらず正常に動作していなかったため、hex_v2.03_core.jsのdrawHex関数でポリゴン情報を返す設定を追加。
  		// クリックした移動可能マスへ現在地を更新
  		google.maps.event.addListener(hexPolygon,"click",function(event){
  			if(event != null){
  				update(event);
  			}	
  		});
  	}
  }
  
  //hexコードとその現在地からの距離を管理
  function createTraceHex(code,step){
  	this.code = code;
  	this.step = step;
  }
  
  //周囲の6つのhexを取得する関数
  function calcSurroundHex(hex,surroundHex){
  	var currentHex = GeoHex.getZoneByCode(hex);
  	var hex1 = GeoHex.getZoneByXY(currentHex.x+1, currentHex.y, level);
  	var hex2 = GeoHex.getZoneByXY(currentHex.x-1, currentHex.y, level);
  	var hex3 = GeoHex.getZoneByXY(currentHex.x, currentHex.y+1, level);
  	var hex4 = GeoHex.getZoneByXY(currentHex.x, currentHex.y-1, level);
  	var hex5 = GeoHex.getZoneByXY(currentHex.x+1, currentHex.y+1, level);
  	var hex6 = GeoHex.getZoneByXY(currentHex.x-1, currentHex.y-1, level);
  
  	if(surroundHex.indexOf(hex1.code) == -1){
  		surroundHex.push(hex1.code);
  	}
  	if(surroundHex.indexOf(hex2.code) == -1){
  		surroundHex.push(hex2.code);
  	}
  	if(surroundHex.indexOf(hex3.code) == -1){
  		surroundHex.push(hex3.code);
  	}
  	if(surroundHex.indexOf(hex4.code) == -1){
  		surroundHex.push(hex4.code);
  	}
  	if(surroundHex.indexOf(hex5.code) == -1){
  		surroundHex.push(hex5.code);
  	}
  	if(surroundHex.indexOf(hex6.code) == -1){
  		surroundHex.push(hex6.code);
  	}
  }
  
  //現在地からマスまでの距離計算
  function countStep(routeHex,tmpHex){
  	if(stepCode.indexOf(routeHex) == -1){
  		tmpHex.length = 0;
  		calcSurroundHex(routeHex,tmpHex);
  	
  		var contain1 = stepCode.indexOf(tmpHex[0]);
  		var contain2 = stepCode.indexOf(tmpHex[1]);
  		var contain3 = stepCode.indexOf(tmpHex[2]);
  		var contain4 = stepCode.indexOf(tmpHex[3]);
  		var contain5 = stepCode.indexOf(tmpHex[4]);
  		var contain6 = stepCode.indexOf(tmpHex[5]);
  		var stepNum = new Array();
  		if(contain1 != -1){
  			var ary1 = traceHex[contain1];
  			stepNum.push((ary1.step + 1));
  		}
  		if(contain2 != -1){
  			var ary2 = traceHex[contain2];
  			stepNum.push((ary2.step + 1));
  		}
  		if(contain3 != -1){
  			var ary3 = traceHex[contain3];
  			stepNum.push((ary3.step + 1));
  		}
  		if(contain4 != -1){
  			var ary4 = traceHex[contain4];
  			stepNum.push((ary4.step + 1));
  		}
  		if(contain5 != -1){
  			var ary5 = traceHex[contain5];
  			stepNum.push((ary5.step + 1));
  		}
  		if(contain6 != -1){
  			var ary6 = traceHex[contain6];
  			stepNum.push((ary6.step + 1));
  		}
  		if(stepNum.length >=1){
  			var minStep = Math.min.apply(null,stepNum);
  			traceHex.push(new createTraceHex(routeHex, minStep));
  			stepCode.push(routeHex);
  			count++;
  		}
  	}
  }
  
  
  // コマの移動
  function update(event) {
    // 移動（可能）フェーズならば
  	if(flg == 0) {
			play = 0;
      //クリックした場所のhex取得
  		var click_zone = GeoHex.getZoneByLocation(event.latLng.lat(),event.latLng.lng(),level);
  		//クリックしたhexが移動可能範囲ならば
  		if(mobileHex.indexOf(click_zone.code) != -1){
  			flg = 1;
  			playerZone = GeoHex.getZoneByCode(click_zone.code);
  			var new_latlng = new google.maps.LatLng(click_zone.lat, click_zone.lon);
  			//地図の移動
  			mapCanvas.panTo(new_latlng);
  			//マーカーの移動
  			marker.setPosition(new_latlng);
  	  	// ストリートビューを更新
  	  	var client = new google.maps.StreetViewService();
  	  	client.getPanoramaByLocation(new_latlng, 65000, function(result, status) {
    		  if(status == google.maps.StreetViewStatus.OK){
    			  var nearestPano   = result.location.pano;
    			  var nearestLatLng = result.location.latLng;
    			  streetViewPanorama.setPosition(nearestLatLng);
    		  }
  	  	});
  	  	// 天気を更新
  			var url = "http://openweathermap.org/img/w/";
  			var png = ".png";
		  	getWeather(function (data) {
	  	    console.log('weather data received');
	  	    console.log(data.weather[0].description);
  				var icon = data.weather[0].icon;
  				var iconUrl = url + icon + png;
  				document.weather.src=iconUrl;
		  	});
		  	
		  	
		  	
		  	// 移動可能として反転していたマスの色をもとにもどす
  		  for(var j = 0; j < mobileHex.length ;j++){
    			var zone = GeoHex.getZoneByCode(mobileHex[j]);
    			zone.drawHex(mapCanvas, { linecolor: "#FF0000", fillcolor: "#FF8a00" ,popinfo:0});
  		  }
  		// 移動可能でないマスがクリックされた場合は、親関数であるmoveからやりなおし
  		}else{
  			flg = 0;
  			move(num);
  		}
  		// 移動可能マスのリセット
  		mobileHex.length = 0;
    
    // 移動（可能）フェーズでなければ
  	} else {
		  for(var j = 0; j < mobileHex.length ;j++) {
  			var zone = GeoHex.getZoneByCode(mobileHex[j]);
  			zone.drawHex(mapCanvas, { linecolor: "#FF0000", fillcolor: "#FF8a00" ,popinfo:0});
		  }
  		mobileHex.length = 0;
  	}
  }
  
  
  
  function readModelWithAjax(params) {
    var request = "called_from_js";
    var attr = params.attrToReadOrWrite;
    var returnValue;
    $.ajax({
      url: request,
      type: "GET",
      dataType: "script",
      scriptCharset: "utf-8",
      data: params,
      // 返ってくるのはjsファイルの実行結果ではなく全体が文字列となったものなので、evalで式に変換してやってここで実行する。eval関数は文字列を引数にとりそれを式に変換する。
      success: function(data) {
        console.log("ajax from js was successed!");
        var json = eval(data); // jsonが返ってくる
        var jsObj = JSON.parse(json); // jsonをjsのオブジェクトとして
        returnValue = jsObj[attr];
        
        eval(params.callbackFunktion + "(" + returnValue + ")");
      },
      error: function(response) {
        console.log("ajax from js was faild");
      }
    });
    //console.log(returnValue.ret);
    //return returnValue.toString();
  }
  
  function testCallback(value) {
    console.log(value);
  }
  
/*
  function writeModelWithAjax(params) {
    //var request = "users/1/called_from_js";
    var request = "called_from_js";  
    $.ajax({
        url: request,
        type: "GET",
        data: {//year : $(":selected").attr("value"),
                model: "User",
                id: 1,
        //        mode: 'hoge',
        //        type: 'entry'
              },
        //dataType: "html",
        // 返ってくるのはjsファイルの実行結果ではなく全体が文字列となったものなので、evalで式に変換してやってここで実行する。eval関数は文字列を引数にとりそれを式に変換する。
        success: function(response) {
            //alert("success");
            
            console.log(eval(response));
        },
        error: function(response) {
            //alert("errror");
            console.log("faild");
        }
    });
  }
*/
  
  
  // ロード時に初期化を実行
  google.maps.event.addDomListener(window,"load",initialize);
  
}, false);