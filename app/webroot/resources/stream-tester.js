(function() {

  // if not stream tester page, return and skip rest of script
  if (!document.getElementById('stream-tester')) {
    return;
  }
  
  if(typeof(localStorage.currentCursor) == "undefined"){
	  localStorage.currentCursor = 0;
  }
  
	var links = {};
	links['http://testfeed.play.mv/live/1000/10001/master.m3u8'] = 'TVM';
	links['http://testfeed.play.mv/live/1000/10002/master.m3u8'] = 'YES';
	links['http://testfeed.play.mv/live/1000/10003/master.m3u8'] = 'Channel 13';
	links['http://testfeed.play.mv/live/1000/10005/master.m3u8'] = 'Raaje TV';
	links['http://testfeed.play.mv/live/1000/10006/master.m3u8'] = 'VTV';
	links['http://testfeed.play.mv/live/1000/10007/master.m3u8'] = 'Aljazeera';
	links['http://testfeed.play.mv/live/1000/10009/master.m3u8'] = 'Sony Rox';
	links['http://testfeed.play.mv/live/1001/10010/master.m3u8'] = 'Crime Investig';
	links['http://testfeed.play.mv/live/1001/10011/master.m3u8'] = 'Ten 2';
	links['http://testfeed.play.mv/live/1001/10012/master.m3u8'] = 'SANGU';
	links['http://testfeed.play.mv/live/1001/10013/master.m3u8'] = 'Sony Max';
	links['http://testfeed.play.mv/live/1001/10014/master.m3u8'] = 'Colors';
	links['http://testfeed.play.mv/live/1001/10015/master.m3u8'] = 'Sony Entertain';
	links['http://testfeed.play.mv/live/1001/10016/master.m3u8'] = 'Sony Sab';
	links['http://testfeed.play.mv/live/1001/10017/master.m3u8'] = 'SUNTV';
	links['http://testfeed.play.mv/live/1002/10020/master.m3u8'] = 'Sony Mix';
	links['http://testfeed.play.mv/live/1002/10022/master.m3u8'] = 'Euro News';
	links['http://testfeed.play.mv/live/1002/10024/master.m3u8'] = 'Times now';
	links['http://testfeed.play.mv/live/1002/10025/master.m3u8'] = 'Sony Channel';
	links['http://testfeed.play.mv/live/1002/10026/master.m3u8'] = 'Axn';
	links['http://testfeed.play.mv/live/1002/10027/master.m3u8'] = 'fyi';
	links['http://testfeed.play.mv/live/1002/10028/master.m3u8'] = 'ESPN';
	links['http://testfeed.play.mv/live/1002/10029/master.m3u8'] = 'Ten 1';
	links['http://testfeed.play.mv/live/1003/10030/master.m3u8'] = 'RT';
	links['http://testfeed.play.mv/live/1003/10034/master.m3u8'] = 'Sony Pix';
	links['http://testfeed.play.mv/live/1003/10035/master.m3u8'] = 'LifeTime';
	links['http://testfeed.play.mv/live/1003/10038/master.m3u8'] = 'KBS World';
	links['http://testfeed.play.mv/live/1004/10041/master.m3u8'] = 'Sony Six';
	links['http://testfeed.play.mv/live/1004/10042/master.m3u8'] = 'BBC Earth';
	links['http://testfeed.play.mv/live/1004/10043/master.m3u8'] = 'History';
	links['http://testfeed.play.mv/live/1004/10044/master.m3u8'] = 'H2';
	links['http://testfeed.play.mv/live/1004/10048/master.m3u8'] = 'Discover World';
	links['http://testfeed.play.mv/live/1004/10049/master.m3u8'] = 'Animal Planet';
	links['http://testfeed.play.mv/live/1005/10050/master.m3u8'] = 'Outdoor Channe';
	links['http://testfeed.play.mv/live/1005/10053/master.m3u8'] = 'DaVinci Learni';
	links['http://testfeed.play.mv/live/1005/10054/master.m3u8'] = 'Animax';
	links['http://testfeed.play.mv/live/1005/10055/master.m3u8'] = 'BabyFirst';
	links['http://testfeed.play.mv/live/1006/10065/master.m3u8'] = 'MTV HD';
	links['http://testfeed.play.mv/live/1007/10078/master.m3u8'] = 'Sony Ten 3';
	links['http://testfeed.play.mv/live/1007/10079/master.m3u8'] = 'Go Plus';
	
  // dom elements
  var win = $(window),
    fileInputEl = $('#file'),
    primaryInputEl = $('[name="primary"]'),
    hlsInputEl = $('[name="hls"]'),
    drmEl = $('#drm'),
    drmItemInputEl = $('[name="drm"]'),
    drmItemEl = $('.drm-item'),
    drmItemOptionsEl = $('.drm-item-options'),
    drmItemInputCheckedEl = drmItemInputEl.filter(':checked'),
    drmItemInputCheckedElValue = drmItemInputCheckedEl.val(),
    drmItemCustomDataInputEl = $('[name="drm-item-custom-data"]'),
    drmWidevineUrlInputEl = $('#drm-widevine-url'),
    drmWidevineCustomNameInputEl = $('#drm-widevine-custom-name'),
    drmWidevineCustomValueInputEl = $('#drm-widevine-custom-value'),
    drmPlayreadyUrlInputEl = $('#drm-playready-url'),
    drmPlayreadyCustomNameInputEl = $('#drm-playready-custom-name'),
    drmPlayreadyCustomValueInputEl = $('#drm-playready-custom-value'),
    drmClearkeyKeyInputEl = $('#drm-clearkey-key'),
    drmClearkeyKeyIdInputEl = $('#drm-clearkey-key-id'),
    drmFairplayCertificateUrlInputEl = $('#drm-fairplay-certificate-url'),
    drmFairplayProcessSpcUrlInputEl = $('#drm-fairplay-process-spc-url'),
    buttonEl = $('[name="button"]'),
    buttonEl = $('[name="button"]'),
    buttonEl = $('[name="button"]'),
    testOutputEl = $('#test-output'),
    outputCodeEl = $('#output-code'),
    playerHttpsEl = $('#'),
    playerHttpEl = $('#stream-tester-player-http'),
    playerHttpIframeEl = playerHttpEl.find('iframe');



  var PLAYER_LIBRARIES = {
    7: '//content.jwplatform.com/libraries/gKLgP1ns.js',
    8: 'resources/wr6i4gal.js'
  };

  // player instance
  var playerInstance = null;

  // local config object
  var config = {};

  // player config object
  var playerConfig = {};

  // temp item config with default keys
  var data = {
    file: fileInputEl.val(),
    fileProtocol: location.protocol,
    primary: 'html5',
    hlshtml: true,
    hls: false,
    drm: null,
    widevine: {},
    playready: {},
    fairplay: {},
    clearkey: {}
  };

  function updateConfig(autostart) {
    config = {
      playlist: [{
        sources: [{
          file: data.file
        }]
      }],
      primary: data.primary,
      hlshtml: data.hlshtml
    };

    // If the function was called with the autostart flag (literally true or false), use in the setup config.
    // Otherwise, default to whatever was set in the dashboard.
    if (typeof autostart !== 'undefined') {
      config.autostart = autostart;
    }

    if (data.hls || data.drm === 'fairplay') {
      config.playlist[0].sources[0].type = 'hls';
    }
    if (data.drm) {
      config.playlist[0].sources[0].drm = {};
      config.playlist[0].sources[0].drm[data.drm] = data[data.drm];
    }
  }

  // TODO: Consolidate this logic with that which is in the Ad Tester.
  function setPlayerLibrary(version, notFirstRun) {
	if(!notFirstRun){
		var script = document.createElement('script');

		script.src = PLAYER_LIBRARIES[version];
		document.body.appendChild(script);
	}
    return Promise.resolve();
  }

  function setOutput() {
    outputCodeEl.html(JSON.stringify(config, null, 2));
    testOutputEl.addClass('test-output-visible');
  }

  function setPlayerInstance() {
    playerInstance = jwplayer('stream-tester-player-https').setup(config);
  }

  function protocolAlert() {
    if (window.location.protocol === data.fileProtocol) {
      playerConfig = Object.create(config);
      playerInstance = jwplayer('stream-tester-player-https').setup(playerConfig);

    } else {
      alert('This stream tester supports testing & debugging HTTPS streams. Please visit demo.jwplayer.com/developer-tools/http-stream-tester/ to test HTTP streams.');
    }
  }

  // alert for demo.jwplayer.com domain only
    function httpTesterAlert() {

     if (window.location.protocol === 'http') {
          playerConfig = Object.create(config);
          playerInstance = jwplayer('stream-tester-player-https').setup(playerConfig);
      } else {
      alert('You are currently using our deprecated HTTP stream tester. Please visit developer.jwplayer.com/tools/stream-tester/ to securely test HTTPS streams with the latest version of the JW Player Stream Tester.');
      }
    }

  // initialize stream tester
  function init(autostart, notFirstRun) {
    // TODO: Consolidate this logic with that which is in the Ad Tester.
    var query = document.location.href.split('playerversion=')[1];
    var version = '8'; // Default to a library using JW Player 8
	
	$(".player-preview").show();
	
	if(!notFirstRun)
		fileInputEl.val(getHistory(currentCursor()));
	
	if(fileInputEl.val() == 0){
		fileInputEl.val("http://testfeed.play.mv/live/1002/10027/master.m3u8");
		localStorage.setItem("history" + currentCursor(), fileInputEl.val());
	}else{
		$('html, body').animate({
			scrollTop: $(".tool-player").offset().top
		}, 500);
	}
	
	buttonEl.text(links[getHistory(currentCursor())]);
	$(".player-preview").text(links[getHistory(currentCursor())]);
	setInterval(function(){ $(".player-preview").hide(); }, 3000);
	
	updateButtonText('#button1', -5);
	updateButtonText('#button2', -4);
	updateButtonText('#button3', -3);
	updateButtonText('#button4', -2);
	updateButtonText('#button5', -1);
	updateButtonText('#button6', 1);
	updateButtonText('#button7', 2);
	updateButtonText('#button8', 3);
	updateButtonText('#button9', 4);
	updateButtonText('#button10', 5);

	
	data.file = fileInputEl.val();
	
	
    setPlayerLibrary(version, notFirstRun)
    // End TODO
    .then(setupConfigs.bind(null, autostart));
  }

  function setupConfigs(autostart) {
    if (typeof jwplayer === 'undefined') {
      return setTimeout(setupConfigs.bind(null, autostart), 100);
    }

    updateConfig(autostart);
    setPlayerInstance();
    setOutput();
  }

  fileInputEl.on('input', function() {
    data.file = fileInputEl.val();
    var url = document.createElement('a');
    url.href = data.file;
    data.fileProtocol = url.protocol;
  });


  // re-initialize player instance with modified config when button is clicked
  buttonEl.on('click', function() {
	if(getHistory(currentCursor()) != fileInputEl.val()){
		// if current is not equal to new link
		// move to next slot and store history
		if(localStorage.currentCursor == 9)
			localStorage.currentCursor = -1;
		
		localStorage.currentCursor++;
		localStorage.setItem("history" + currentCursor(), fileInputEl.val());
	}
	
		loadVideo();
  });
  
  
  $('#prev_button').on('click', function() {
	// $('#file').val('http://testfeed.play.mv/live/' + Math.floor(($('#file').val().split('/')[5]*1-1)/10) + '/' + ($('#file').val().split('/')[5]*1-1) +'/master.m3u8');  $('#load_button').click();
		
		prevHistory(true);
		loadVideo();
  });
  
  $('#next_button').on('click', function() {
	// $('#file').val('http://testfeed.play.mv/live/' + Math.floor(($('#file').val().split('/')[5]*1+1)/10) + '/' + ($('#file').val().split('/')[5]*1+1) +'/master.m3u8');  $('#load_button').click();  
		
		nextHistory(true);
		loadVideo();
  });
  
  $('#button1').on('click', function() {navigateHistory(currentCursor(), -5, 1, true);loadVideo();});
  $('#button2').on('click', function() {navigateHistory(currentCursor(), -4, 1, true);loadVideo();});
  $('#button3').on('click', function() {navigateHistory(currentCursor(), -3, 1, true);loadVideo();});
  $('#button4').on('click', function() {navigateHistory(currentCursor(), -2, 1, true);loadVideo();});
  $('#button5').on('click', function() {navigateHistory(currentCursor(), -1, 1, true);loadVideo();});
  $('#button6').on('click', function() {navigateHistory(currentCursor(), 1, 1, true);loadVideo();});
  $('#button7').on('click', function() {navigateHistory(currentCursor(), 2, 1, true);loadVideo();});
  $('#button8').on('click', function() {navigateHistory(currentCursor(), 3, 1, true);loadVideo();});
  $('#button9').on('click', function() {navigateHistory(currentCursor(), 4, 1, true);loadVideo();});
  $('#button10').on('click', function() {navigateHistory(currentCursor(), 5, 1, true);loadVideo();});
  
  function loadVideo() {
    data.file = fileInputEl.val();
    var url = document.createElement('a');
    url.href = data.file;
    data.fileProtocol = url.protocol;
	$(".player-preview").show();

	$('html, body').animate({
        scrollTop: $(".player-preview").offset().top
    }, 500);
	
	setInterval(function(){ $(".player-preview").hide(); }, 3000);
		

    init(true, true);
    protocolAlert();
  }

  function currentCursor() {
	  return localStorage.currentCursor * 1;
  }

  function nextHistory(permanent) {
	  return navigateHistory(currentCursor(), +1, 1, permanent);
  }

  function prevHistory(permanent) {
	  return navigateHistory(currentCursor(), -1, 1, permanent);
  }

  function navigateHistory(cursor, direction, iteration, permanent, notRecursive) {
	  if(iteration > 10)
		  return 0;
	  
	  // if(cursor+direction <= -1)
		 // cursor = 10;
	  // else if(cursor+direction >= 10)
		 // cursor = -1;
	 
	  // cursor+=direction;
	 
	 cursor = (cursor+direction)%10
	 
	 if(cursor<0)
		cursor += 10;
	 
	  var item = getHistory(cursor);
	  if(item == 0){
		  if(notRecursive)
			  return 0;
		  else
			  return navigateHistory(cursor, direction, iteration++, permanent);
	  }
	  if(permanent){
		  fileInputEl.val(item);
		  localStorage.currentCursor = cursor;
	  }
	
	  return item;
  }
  
  function getHistory(cursor){
	var item = localStorage.getItem("history" + cursor);
	if(item == null){
		return 0;
	}
	return item;
  }
  
  function updateButtonText(buttonId, direction){
	  var link = navigateHistory(currentCursor(), direction, 1, false, true);
	  if(link == 0)
		 $(buttonId).hide();
	  else{
		 $(buttonId).text(links[link]);
		 $(buttonId).show();
	  }
  }

  init();

})();
