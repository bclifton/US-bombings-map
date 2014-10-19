var username = 'bclifton';

function main() {

  var map = new L.map('map', {
    // center: [31.783333, 35.216667],
    center: [21.416667, 39.816667],
    zoom: 4,
    minZoom: 3,
    maxZoom: 7
  });

  // creates the MapBox baselayer:
  L.mapbox.tileLayer('bclifton.j3dc99p7', {
    accessToken: 'pk.eyJ1IjoiYmNsaWZ0b24iLCJhIjoicWNXT0Z6OCJ9.JvNO6GIbU8BZ-8LLSEwz2Q',
    attribution: 'Brian Clifton'
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
    '#ds_aa_nla_isil_static{'+
    '  comp-op: lighter;'+
    '  marker-fill-opacity: 0.75;'+
    '  marker-line-color: #FFF;'+
    '  marker-line-width: 0;'+
    '  marker-line-opacity: 1;'+
    '  marker-type: ellipse;'+
    '  marker-width: 1.5;'+
    '  marker-fill: #6d470e;'+
    '}'+
    '#ds_aa_nla_isil_static[frame-offset=1] {'+
    ' marker-width:3.5;'+
    ' marker-fill-opacity:0.375; '+
    '}'+
    '#ds_aa_nla_isil_static[frame-offset=2] {'+
    ' marker-width:5.5;'+
    ' marker-fill-opacity:0.1875; '+
    '}'+
    '#ds_aa_nla_isil_static[frame-offset=3] {'+
    ' marker-width:7.5;'+
    ' marker-fill-opacity:0.125; '+
    '}';



  var bombBlastsTorque = new L.TorqueLayer({
    user: 'bclifton',
    table: 'bombingsdata2_1',
    cartocss: torqueStyle,
    sql: "SELECT * FROM bombingsdata2_1 WHERE (date >= ('2009-12-10T00:00:00-00:00') AND date <= ('2014-10-10T00:00:00-00:00'))",
    tiler_protocol: 'https',
    tiler_port: 443
  });


  bombBlastsTorque.addTo(map);
  bombBlastsTorque.play();



  d3.csv('assets/Bombings_deathsByDate.csv', function(data) {
    // console.log(data);

    var deathsByDate = {};
    var totalDeaths = 0;

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

      // console.log(torqueLayer.options);



      // each time time changes, move the slider
      torqueLayer.on('change:time', function(changes) {
        $("#torque-slider" ).slider({
          value: changes.step
        });

        var month_year = changes.time.toString().substr(4).split(' ');

        // console.log(changes.step);
        if (changes.step === 0) {
          totalDeaths = 0;
          $('#bodies').empty();
        }

        var torqueDate = moment(changes.time).format('MM/DD/YY');

        $('.ui-slider-handle').html('' + moment(changes.time).format('MMM. YYYY'));

        if (deathsByDate[torqueDate]) {
          totalDeaths += +deathsByDate[torqueDate].deaths_max
          console.log(totalDeaths);

          for (var i = 0; i < +deathsByDate[torqueDate].deaths_max; i++) {
            d3.select('#bodies')
                .append('svg')
                .attr('width', '20px')
                .attr('height', '20px')
                .append('rect')
                .attr('x', 1)
                .attr('y', 0)
                .attr('width', '20px')
                .attr('height', '20px');
          }
          // console.log(deathsByDate[torqueDate].deaths_max);
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
  // $('#pause').on('click', function() {
  //   console.log('pause');
  //   bombBlastsTorque.toggle();
  //   console.log(bombBlastsTorque.getTime());
  // });
  // $('#start').on('click', function() {
  //   console.log('play');
  //   bombBlastsTorque.play();
  //   console.log(bombBlastsTorque.getTime());
  // });
  // $('#stop').on('click', function() {
  //   console.log('stop');
  //   // bombBlastsTorque.stop();
  //   bombBlastsTorque.setStep(100)
  //   console.log(bombBlastsTorque.getTime());
  // });
  //

/////////////////

  /**
		   * inits slider and a small play/pause button
		   */



} // ends main()

window.onload = main;
