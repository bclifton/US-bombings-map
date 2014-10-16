var username = 'bclifton';

function main() {
  // map = new L.mapbox.map('map', 'bclifton.j3dc99p7', {
  //   accessToken: 'pk.eyJ1IjoiYmNsaWZ0b24iLCJhIjoicWNXT0Z6OCJ9.JvNO6GIbU8BZ-8LLSEwz2Q',
  //   minZoom: 3,
  //   maxZoom: 7
  //   })
  //   .setView([31.783333, 35.216667], 4);

  var map = new L.map('map', {
    center: [31.783333, 35.216667],
    zoom: 4,
    minZoom: 3,
    maxZoom: 7
  });



  // creates the MapBox baselayer:
  L.mapbox.tileLayer('bclifton.j3dc99p7', {
    accessToken: 'pk.eyJ1IjoiYmNsaWZ0b24iLCJhIjoicWNXT0Z6OCJ9.JvNO6GIbU8BZ-8LLSEwz2Q',
    attribution: 'Brian Clifton'
  }).addTo(map);




  var muslimCountries = 'https://bclifton.cartodb.com/api/v2/viz/abb2c610-5413-11e4-aeb5-0e018d66dc29/viz.json';

  var muslimStyle = '@basecolor: #1fa03d;'+
    '#wrd_province_religion_muslim[religcatp="95-100%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.5;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="90-95%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.4;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="85-90%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.3;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="75-85%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.2;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="60-75%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.1;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="40-60%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0.05;'+
    '}'+
    '#wrd_province_religion_muslim[religcatp="10-40%"] {'+
    '   polygon-fill: @basecolor;'+
    '   polygon-opacity: 0;'+
    '}';



  ////////////////////////////////////////////////
  var layers = [];

  cartodb.createLayer(map, 'http://bclifton.cartodb.com/api/v2/viz/5b91461e-5424-11e4-97cd-0e853d047bba/viz.json')
    .done(function(layer) {

      // layer.show();
      layer
        .on('featureOver', function(e, latlng, pos, data) {
          console.log(e, latlng, pos, data);
        });

      // console.log(layer.getSubLayerCount());

      // var slider = vis.getOverlay('time_slider');
      // slider.formatter(function(d) {
      //   return "month:" + d.getUTCMonth();
      // });
    });

  // cartodb.Tiles.getTiles({
  //   user_name: 'bclifton',
  //   sublayers: [{
  //     sql: "SELECT * FROM table_name",
  //     cartocss: '#layer { marker-fill: #F0F0F0; }'
  //   }],
  //   tiler_protocol: 'https', // not required
  //   tiler_host: 'cartodb.com', // not required
  //   tiler_port: 80 // not required
  // });


  // cartodb.createLayer(map, muslimCountries)
  //   .addTo(map)
  //   .on('done', function(layer) {
  //
  //
  //     var slider = vis.getOverlay('time_slider');
  //     slider.formatter(function(d) {
  //       return "month:" + d.getUTCMonth();
  //     });
  //
  //     console.log(layer);
  //     map.addLayer(layer);
  //     // layers.push(layer);
  //     //
  //     // layer.createSubLayer({
  //     //   sql: 'SELECT * FROM wrd_province_religion_muslim',
  //     //   cartocss: muslimStyle
  //     // });
  //
  //   })
  //   .on('error', function(err) {
  //     console.log('error: ', err);
  //   });





  // creates the cartoDB layer:
  // cartodb.createLayer(map, {
  //   user_name: 'bclifton',
  //   type: 'cartodb',
  //   sublayers: [{
  //     sql: 'SELECT * FROM wrd_province_religion_muslim',
  //     cartocss: muslimStyle
  //   }]
  // })


  // cartodb.createLayer(map, muslimCountries)
  //   .done(function(layer) {
  //
  //     map.addLayer(layer)
  //
  //     layer.createSubLayer({
  //       sql: 'SELECT * FROM wrd_province_religion_muslim',
  //       cartocss: muslimStyle
  //     })
  //   });
    // .addTo(map);
  // cartodb.createLayer(map, muslimCountries).addTo(map);

  // var cartoLayer = L.tileLayer().addTo(map);
  //


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
    table: 'ds_aa_nla_isil',
    cartocss: torqueStyle,
    sql: "SELECT * FROM ds_aa_nla_isil WHERE (date >= ('2009-01-01T00:00:00-00:00') AND date <= ('2014-10--10T20:00:00-04:00'))",
    tiler_protocol: 'https',
    tiler_port: 443
  });


  bombBlastsTorque.addTo(map);
  bombBlastsTorque.play();



  // cartodb.createLayer(map, {
  //     user_name: 'bclifton',
  //     type: 'cartodb',
  //     sublayers: [{
  //       sql: "SELECT * FROM ds_aa_nla_isil WHERE (date >= ('2009-01-01T00:00:00-00:00') AND date <= ('2014-10--10T20:00:00-04:00'))",
  //       cartocss: '#ds_aa_nla_isil{ marker-fill-opacity: 0.9; marker-line-color: #FF5C00; marker-line-width: 0.25; marker-line-opacity: 1; marker-type: ellipse; marker-width: 6; marker-fill: #FFA300; }'
  //       // cartocss: 'Map { -torque-frame-count:128; -torque-animation-duration:15; -torque-time-attribute:"date"; -torque-aggregation-function:"count(cartodb_id)"; -torque-resolution:1; -torque-data-aggregation:linear;} #ds_aa_nla_isil{ comp-op: lighter; marker-fill-opacity: 0.9; marker-line-color: #FF5C00; marker-line-width: 0.25; marker-line-opacity: 1; marker-type: ellipse; marker-width: 6; marker-fill: #FFA300; } #ds_aa_nla_isil[frame-offset=1] { marker-width:8; marker-fill-opacity:0.45; } #ds_aa_nla_isil[frame-offset=2] { marker-width:10; marker-fill-opacity:0.225; } #ds_aa_nla_isil[frame-offset=3] { marker-width:12; marker-fill-opacity:0.15; } #ds_aa_nla_isil[frame-offset=4] { marker-width:14; marker-fill-opacity:0.1125; }'
  //     }]
  //   })
  //   .addTo(map)
  //   .done(function(layer) {
  //     console.log(layer);
  //   })
  //   .on('error', function(err) {
  //     console.log('error:', err);
  //   });

  // cartodb.createLayer(map, layerUrl)
  //   .addTo(map)
  //   .on('done', function(layer) {
  //     console.log('layer: ', layer);
  //
  //     map.addLayer(layer);
  //     layer.createSubLayer({
  //       sql: "SELECT * FROM ds_aa_nla_isil WHERE (date >= ('2009-01-01T00:00:00-00:00') AND date <= ('2014-10--10T20:00:00-04:00'))",
  //       cartocss: 'Map { -torque-frame-count:128; -torque-animation-duration:15; -torque-time-attribute:"date"; -torque-aggregation-function:"count(cartodb_id)"; -torque-resolution:1; -torque-data-aggregation:linear;} #ds_aa_nla_isil{ comp-op: lighter; marker-fill-opacity: 0.9; marker-line-color: #FF5C00; marker-line-width: 0.25; marker-line-opacity: 1; marker-type: ellipse; marker-width: 6; marker-fill: #FFA300; } #ds_aa_nla_isil[frame-offset=1] { marker-width:8; marker-fill-opacity:0.45; } #ds_aa_nla_isil[frame-offset=2] { marker-width:10; marker-fill-opacity:0.225; } #ds_aa_nla_isil[frame-offset=3] { marker-width:12; marker-fill-opacity:0.15; } #ds_aa_nla_isil[frame-offset=4] { marker-width:14; marker-fill-opacity:0.1125; }'});
  //   })
  //   .on('error', function(err) {
  //     console.log('error: ', err);
  //   });

} // ends main()

window.onload = main;
