(function() {

  // if not stream tester page, return and skip rest of script
  if (!document.getElementById('stream-tester')) {
    return;
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
    testOutputEl = $('#test-output'),
    outputCodeEl = $('#output-code'),
    playerHttpsEl = $('#'),
    playerHttpEl = $('#stream-tester-player-http'),
    playerHttpIframeEl = playerHttpEl.find('iframe');



  var PLAYER_LIBRARIES = {
    7: '//content.jwplatform.com/libraries/gKLgP1ns.js',
    8: 'JW Developer - HTTP Stream Tester_files//wr6i4gal.js'
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

    // document.querySelectorAll('input[name="version"]').forEach(function(input) {
      // input.addEventListener('click', switchPlayerLibrary);
      // input.checked = input.value === version;
    // });

    return Promise.resolve();
  }

  // function switchPlayerLibrary(e) {
    // var current = document.location.href.split('?')[0];

    // document.location.href = current + '?playerversion=' + e.target.value;
  // }
  // End TODO

  // set drm config items as unsupported by current browser
  // function setUnsupportedDrmItems(els) {
    // for (var i = 0; i < els.length; i++) {
      // var el = $('#drm-' + els[i]);
      // el.addClass('drm-item-not-supported').find('input').prop({
        // disabled: true
      // });
    // }
  // }

  // function setDrmDisplay() {
    // if (data.hlshtml) {
      // drmEl.removeClass('drm-not-supported');
    // } else {
      // drmEl.addClass('drm-not-supported');
    // }
  // }

  // function setDrmItemDisplay() {
    // drmItemEl.removeClass('drm-item-selected');
    // if (!data.drm) {
      // $('#drm-default').addClass('drm-item-selected');
    // } else {
      // $('#drm-' + data.drm).addClass('drm-item-selected');
    // }
  // }

  // function setDrmCustomData() {
    // if (data.drm === 'widevine' || data.drm === 'playready') {
      // data[data.drm].headers = [{
        // name: null,
        // value: null
      // }];
    // }
  // }

  // function deleteDrmCustomData() {
    // if (data.drm === 'widevine' || data.drm === 'playready') {
      // delete(data[data.drm].headers);
    // }
  // }

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
  function init(autostart) {
    // TODO: Consolidate this logic with that which is in the Ad Tester.
    var query = document.location.href.split('playerversion=')[1];
    // var version = query ? query.charAt(0, 1) : '8'; // Default to a library using JW Player 8
    var version = '8'; // Default to a library using JW Player 8

    // if (version === '8') {
      // document.querySelector('input[value="flash"]').disabled = 'disabled';
    // }

    setPlayerLibrary(version)
    // End TODO
    .then(setupConfigs.bind(null, autostart));
  }

  function setupConfigs(autostart) {
    if (typeof jwplayer === 'undefined') {
      return setTimeout(setupConfigs.bind(null, autostart), 100);
    }

    // setDrmItemDisplay();
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

  // update config when render mode option changes
  // primaryInputEl.on('change', function() {
    // data.primary = primaryInputEl.filter(':checked').val();
    // data.hlshtml = data.primary === 'html5';
    // setDrmDisplay();
  // });

  // drmItemCustomDataInputEl.on('change', function() {
    // var el = $(this),
      // elCustomDataEl = el.parent().siblings('.drm-item-custom-data');
    // if (el.is(':checked')) {
      // elCustomDataEl.addClass('drm-item-custom-data-visible');
      // setDrmCustomData();
    // } else {
      // elCustomDataEl.removeClass('drm-item-custom-data-visible');
      // deleteDrmCustomData();
    // }
  // });

  // drmClearkeyKeyInputEl.on('keyup', function() {
    // data.clearkey.key = drmClearkeyKeyInputEl.val();
  // });

  // drmClearkeyKeyIdInputEl.on('keyup', function() {
    // data.clearkey.keyId = drmClearkeyKeyIdInputEl.val();
  // });

  // drmFairplayCertificateUrlInputEl.on('keyup', function() {
    // data.fairplay.certificateUrl = drmFairplayCertificateUrlInputEl.val();
  // });

  // drmFairplayProcessSpcUrlInputEl.on('keyup', function() {
    // data.fairplay.processSpcUrl = drmFairplayProcessSpcUrlInputEl.val();
  // });

  // drmWidevineUrlInputEl.on('keyup', function() {
    // data.widevine.url = drmWidevineUrlInputEl.val();
  // });

  // drmWidevineCustomNameInputEl.on('keyup', function() {
    // data.widevine.headers[0].name = drmWidevineCustomNameInputEl.val();
  // });

  // drmWidevineCustomValueInputEl.on('keyup', function() {
    // data.widevine.headers[0].value = drmWidevineCustomValueInputEl.val();
  // });

  // drmPlayreadyUrlInputEl.on('keyup', function() {
    // data.playready.url = drmPlayreadyUrlInputEl.val();
  // });

  // drmPlayreadyCustomNameInputEl.on('keyup', function() {
    // data.playready.headers[0].name = drmPlayreadyCustomNameInputEl.val();
  // });

  // drmPlayreadyCustomValueInputEl.on('keyup', function() {
    // data.playready.headers[0].value = drmPlayreadyCustomValueInputEl.val();
  // });

  // hlsInputEl.on('change', function() {
    // data.hls = hlsInputEl.is(':checked');
  // });

  // update config when drm input value changes
  // drmItemInputEl.on('change', function() {
    // drmItemInputCheckedEl = drmItemInputEl.filter(':checked');
    // drmItemInputCheckedElValue = drmItemInputCheckedEl.val();
    // if (drmItemInputCheckedElValue) {
      // data.drm = drmItemInputCheckedElValue;
    // } else {
      // data.drm = null;
    // }
    // setDrmItemDisplay();
  // });

  // re-initialize player instance with modified config when button is clicked
  buttonEl.on('click', function() {
    data.file = fileInputEl.val();
    var url = document.createElement('a');
    url.href = data.file;
    data.fileProtocol = url.protocol;

    init(true);
    protocolAlert();
  });

  // hide options not supported by user's current browser
  // if (bowser.chrome) {
    // setUnsupportedDrmItems(['playready', 'fairplay']);
  // } else if (bowser.safari) {
    // setUnsupportedDrmItems(['playready', 'widevine', 'clearkey']);
  // } else if (bowser.firefox) {
    // setUnsupportedDrmItems(['playready', 'fairplay']);
  // } else if (bowser.msie || bowser.msedge) {
    // setUnsupportedDrmItems(['widevine', 'fairplay', 'clearkey']);
  // }

  // var acceptedOrigins = [
    // 'http://demo.jwplayer.com',
    // 'http://local.developer.jwplayer.com'
  // ];

  // initialize default player instance
  init();

})();
