(function() {

  // if not stream tester page, return and skip rest of script
  if (!document.getElementById('stream-tester')) {
    return;
  }
  
  if(typeof(localStorage.currentCursor) == "undefined"){
	  localStorage.currentCursor = 0;
  }

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
  function setPlayerLibrary(version) {
    var script = document.createElement('script');

    script.src = PLAYER_LIBRARIES[version];
    document.body.appendChild(script);

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
	
	data.file = fileInputEl.val();
		
	
    setPlayerLibrary(version)
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
  
  function loadVideo() {
    data.file = fileInputEl.val();
    var url = document.createElement('a');
    url.href = data.file;
    data.fileProtocol = url.protocol;

	$('html, body').animate({
        scrollTop: $(".tool-player").offset().top
    }, 500);

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

  function navigateHistory(cursor, direction, iteration, permanent) {
	  if(iteration > 10)
		  return 0;
	  
	  if(cursor+direction == -1)
		 cursor = 10;
	  else if(cursor+direction == 10)
		 cursor = -1;
	 
	  cursor+=direction;
	  var item = getHistory(cursor);
	  if(item == 0)
		  return navigateHistory(cursor, direction, iteration++, permanent);
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

  init();

})();
