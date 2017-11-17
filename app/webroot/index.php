<!DOCTYPE html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Play.mv Pro Version</title>
    <link rel="stylesheet" href="JW Developer - HTTP Stream Tester_files/developer.css">
    <!-- <link rel="stylesheet" href="JW Developer - HTTP Stream Tester_files/developer.min.css"> -->
    <link rel="stylesheet" href="JW Developer - HTTP Stream Tester_files/style.css">
  </head>
  <body >

    <ul class="demo-index-list">
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1000/10001/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>TVM</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/198.png" alt="TVM HD" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1000/10002/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>YES</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/203.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1000/10003/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>Channel 13</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/200.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1000/10005/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>Raaje TV</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/199.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1000/10006/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>VTV</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/202.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1001/10012/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>SANGUTV HD</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/213.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1001/10017/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>SUNTV</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/233.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1007/10079/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>Go Plus</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/goPlus.jpg" style="position: relative;"></p>
            </div>
          </a>
        </li>
        <li>
          <a href="#" onclick="$('#file').val('http://testfeed.play.mv/live/1002/10027/master.m3u8');    $('#load_button').click();">
            <div class="body">
              <h3>fyi</h3>
              <p><img src="JW Developer - HTTP Stream Tester_files/fyi.png" style="position: relative;"></p>
            </div>
          </a>
        </li>
    </ul>


  <div class="page" id="stream-tester">
    <div>


  <div class="jw-tool">

    <div class="container">

      <div class="row">

	<div class="configuration">
              <h2>File URL:</h2>
              <input id="file" type="text" placeholder="Enter a stream URL" value="http://testfeed.play.mv/live/1002/10027/master.m3u8">
            </div>

            <div class="button-set">
              <button id="next_button" class="button button-sm" type="button" name="button"href="#" onclick="$('#file').val('http://testfeed.play.mv/live/' + Math.floor(($('#file').val().split('/')[5]*1-1)/10) + '/' + ($('#file').val().split('/')[5]*1-1) +'/master.m3u8');  $('#load_button').click();">Previous</button>
              <button id="load_button" class="button button-sm" type="button" name="button">Load stream</button>
              <button id="next_button" class="button button-sm" type="button" name="button"href="#" onclick="$('#file').val('http://testfeed.play.mv/live/' + Math.floor(($('#file').val().split('/')[5]*1+1)/10) + '/' + ($('#file').val().split('/')[5]*1+1) +'/master.m3u8');  $('#load_button').click();">Next</button>
            </div>


         </div>
        </div>

        <div class="column sm-12 lg-12">
          <div class="tool-player">
            <div class="player-preview">Enjoy video</div>
            <div id="stream-tester-player-https"></div>
          </div>
        </div>

      </div>

    </div>

  </div>

    <script src="JW Developer - HTTP Stream Tester_files/jquery.min.js"></script>
   
    <script type="text/javascript" src="JW Developer - HTTP Stream Tester_files/stream-tester.js"></script>
  </body>
</html>
