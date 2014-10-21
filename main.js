var username = 'bclifton';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function main() {

  var height = ($(window).height() / 2);
  console.log('height', height);

  $('#map').css('height', height);


  var map = new L.map('map', {
    // center: [31.783333, 35.216667],
    center: [22.416667, 42.816667],
    zoom: 3,
    minZoom: 3,
    maxZoom: 7
  });

  // creates the MapBox baselayer:
  L.mapbox.tileLayer('bclifton.j3dc99p7', {
    accessToken: 'pk.eyJ1IjoiYmNsaWZ0b24iLCJhIjoicWNXT0Z6OCJ9.JvNO6GIbU8BZ-8LLSEwz2Q',
    attribution: 'Brian Clifton | CartoDB | MapBox'
  }).addTo(map);


  var torqueStyle = /** torque visualization */
    'Map {'+
    '-torque-frame-count:1024;'+
    '-torque-animation-duration:30;'+
    '-torque-time-attribute:"date";'+
    '-torque-aggregation-function:"count(cartodb_id)";'+
    '-torque-resolution:1;'+
    '-torque-data-aggregation:cumulative;'+
    '}'+
    ''+
    '#usairstrikes1csv{'+
    '  comp-op: lighter;'+
    '  marker-fill-opacity: 0.75;'+
    '  marker-line-color: #FFF;'+
    '  marker-line-width: 0;'+
    '  marker-line-opacity: 1;'+
    '  marker-type: ellipse;'+
    '  marker-width: 1.5;'+
    '  marker-fill: #6d470e;'+
    '  [zoom > 5] {'+
    '    marker-width: 3.5;'+
    '    marker-fill-opacity:0.75'+
    '  }'+
    '}'+
    '#usairstrikes1csv[frame-offset=1] {'+
    ' marker-width:3.5;'+
    ' marker-fill-opacity:0.375; '+
    '  [zoom > 6][frame-offset=1] {'+
    '    marker-width: 7;'+
    '    marker-fill-opacity:0.375'+
    '  }'+
    '}'+
    '#usairstrikes1csv[frame-offset=2] {'+
    ' marker-width:5.5;'+
    ' marker-fill-opacity:0.1875; '+
    '  [zoom > 6][frame-offset=2] {'+
    '    marker-width: 11;'+
    '    marker-fill-opacity:0.1875'+
    '  }'+
    '}'+
    '#usairstrikes1csv[frame-offset=3] {'+
    ' marker-width:7.5;'+
    ' marker-fill-opacity:0.125; '+
    '  [zoom > 6][frame-offset=3] {'+
    '    marker-width: 15;'+
    '    marker-fill-opacity:0.125'+
    '  }'+
    '}';



  var bombBlastsTorque = new L.TorqueLayer({
    user: 'bclifton',
    table: 'usairstrikes1csv',
    cartocss: torqueStyle,
    sql: "SELECT * FROM usairstrikes1csv WHERE (date >= ('2009-12-10T00:00:00-00:00') AND date <= ('2014-10-20T00:00:00-00:00'))",
    tiler_protocol: 'https',
    tiler_port: 443
  });


  bombBlastsTorque.addTo(map);
  bombBlastsTorque.play();



  d3.csv('assets/Bombings_deathsByDate.csv', function(data) {
    // console.log(data);

    var deathsByDate = {};
    var totalDeaths = 0;
    var childDeaths = 0;

    _.each(data, function(entry) {
      var date = entry['Row Labels'];
      deathsByDate[date] = {
        'deaths_max': entry['Sum of deaths_max'],
        'deaths_children': entry['Sum of children']
      };
    });

    console.log(deathsByDate);

    init_slider(bombBlastsTorque);

    // var bodies = d3.select('#bodies')
    //   .append('svg')
    //   .attr('width', '20px')
    //   .attr('height', '20px')
    //   .append('rect')
    //   .attr('x', 0)
    //   .attr('y', 0)
    //   .attr('width', '20px')
    //   .attr('height', '20px')
    //   .attr('fill', 'red');





    function init_slider(torqueLayer) {
      var torqueTime = $('#torque-time');
      $("#torque-slider").slider({
        min: 0,
        max: torqueLayer.options.steps,
        value: 0,
        step: 1,
        slide: function(event, ui){
          var step = ui.value;
          torqueLayer.setStep(step);
        }
      });

      console.log('steps', torqueLayer.options.steps);

      torqueLayer.toggle();
      setTimeout(function(){
        torqueLayer.toggle();
      }, 1500);

      // each time time changes, move the slider
      torqueLayer.on('change:time', function(changes) {
        $("#torque-slider" ).slider({
          value: changes.step
        });

        // showEvent(changes, torqueLayer, '04-11-11', '#libya');

        var month_year = changes.time.toString().substr(4).split(' ');

        // resets the 'bodies' seciton:
        if (changes.step === 0) {
          totalDeaths = 0;
          $('#bodies').empty();
          
        }

        // pauses at the end of the slider:
        if (changes.step === 1023) {
          torqueLayer.toggle();
          setTimeout(function(){
            torqueLayer.toggle();
          }, 3000);
        }

        var torqueDate = moment(changes.time).format('MM/DD/YY');

        $('.ui-slider-handle').html('' + moment(changes.time).format('MMM. YYYY'));

        if (deathsByDate[torqueDate]) {
          totalDeaths += +deathsByDate[torqueDate].deaths_max;
          childDeaths += +deathsByDate[torqueDate].deaths_children;

          $('#bodyCount').html(totalDeaths);
          $('#childrenBodyCount').html(childDeaths);

          // draws the adult body svgs:
          for (var i = 0; i < +deathsByDate[torqueDate].deaths_max; i++) {         
            var margin = getRandomArbitrary(-3, 5);
            var r = Math.random()*10;

            if (r > 3) {
              var num = getRandomArbitrary(1, 14);
              $('#bodies').append('<img src="img/man-'+ num +'.svg" style="margin-left:'+ margin +'px;">') 
            } else {
              var num = getRandomArbitrary(1, 9);
              $('#bodies').append('<img src="img/woman-'+ num +'.svg" style="margin-left:'+ margin +'px;">') 
            }
          }

          // draws the children body svgs:
          for (var i = 0; i < +deathsByDate[torqueDate].deaths_children; i++) {         

            var margin = getRandomArbitrary(-3, 5);
            var num = getRandomArbitrary(1, 13);
            $('#bodies').append('<img src="img/child-'+ num +'.svg" style="margin-left:'+ margin +'px;">') 
            
          }


        }


        //As long as the date is undefined (at the very start) do not display the date
        if(typeof month_year[2] === 'undefined') {
          console.log(month_year[2]);
        } else {
          torqueTime.text(moment(changes.time).format('MMMM YYYY'));
        }
      });

      // play-pause toggle
      $(".ui-play-pause").click(function(){
        torqueLayer.toggle();
        $(this).toggleClass('glyphicon-pause');
      });
    };
});

/////////////////

  /**
		   * inits slider and a small play/pause button
		   */

  function showEvent(changes, torqueLayer, dayTrigger, eventID) {
    if (moment(changes.time).format('MM-DD-YY') === dayTrigger) {

      console.log('event Triggered');
      // Show the event:
      // d3.select(eventID).classed('visible', true);

      torqueLayer.toggle();

      setTimeout(function(){
        torqueLayer.toggle();
      }, 1000);
    }
  }


} // ends main()

window.onload = main;
