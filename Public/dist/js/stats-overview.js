var Overview = (function() {
  var chartDataUrl = null;
  
  var btn7Day = $('#btn-7day');
  var btn1Mon = $('#btn-1month');
  var btn1Year = $('#btn-1year');
  var btnAll = $('#btn-all');
  var noDataTips = $('.chart-no-data-tip');
  var chartTitleExtra = $('.chart-title-extra');
  var inputDateStart = $('#input-date-start');
  var inputDateEnd = $('#input-date-end');
  var btnDateRange = $('#btn-date-range');
   
  Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.4)";
  Chart.defaults.global.tooltipCaretSize = 0;
  Chart.defaults.global.responsive = true;
  var lineChartOptions = {
    scaleGridLineColor: "rgba(0,0,0,.05)",
    datasetFill: false,
    pointHitDetectionRadius: 3,
  };
  var pieOptions = {
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
  };
  
  var activeChart = {
    chart: null,
    canvas: $("#activeChart").get(0).getContext("2d"),
    empty: $('#active-no-data-tip'),
  };
  var requestChart = {
    chart: null,
    canvas: $("#requestChart").get(0).getContext("2d"),
    empty: $('#request-no-data-tip'),
  };
  var activeDistChart = {
    chart: null,
    canvas: $("#activeDistChart").get(0).getContext("2d"),
    empty: $('#activedist-no-data-tip'),
    total: $('#activedist-total'),
    legend: $('#activedist-legend'),
  };
  var downloadChart = {
    chart: null,
    canvas: $("#downloadChart").get(0).getContext("2d"),
    empty: $('#download-no-data-tip'),
  };
  
  var randomColors = function(total) {
    if (total <= 0) return [];
    var h = 1 / total; // distribute the colors evenly on the hue range
    var c = []; // hold the generated colors
    for (var u = 0; u < total; u++) {
      c.push(HSVtoRGB(h * u, 1, 1));
    }
    return c;
  }
  
  var HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
  
  var showChart = function(days, start, end) {
    var pData = {
      days: days,
      start: start,
      end: end
    };
    
    $.ajax({
      type: "POST",
      cache: false,
      url: chartDataUrl,
      data: pData, 
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          $(chartTitleExtra).html('(' + $(chartTitleExtra).data('range') + ')');
          // active count  
          setupLineChart(activeChart, {
            labels: response.data.activeData.labels,
            values: response.data.activeData.values,
          });
          
          // request count  
          setupLineChart(requestChart, {
            labels: response.data.requestData.labels,
            values: response.data.requestData.values,
          });
          
          // active count distribution  
          setupPieChart(activeDistChart, response.data.activeDistData);
          
          // download count
          setupLineChart(downloadChart, {
            labels: response.data.downloadData.labels,
            values: response.data.downloadData.values,
          });
        } else {
          var error = response.error;
          toastr.error('获取数据失败。' + error.msg);
        }
      },
      error: function(xhr, status, error) {
        toastr.error('获取数据失败。' + error.msg);
      }
    });
  };
  
  var setupLineChart = function(oChart, data) {
    // currently only support 1 dateset
    var chartData = {
      labels: data.labels,
      datasets: [
        {
          label: "",
          data: data.values,
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
        }
      ]
    };
    if (oChart.chart != null) {
      oChart.chart.destroy();
    }
    data.values.length > 0 ? $(oChart.empty).hide() : $(oChart.empty).show();
    oChart.chart = new Chart(oChart.canvas).Line(chartData, lineChartOptions);
  };
  
  var setupPieChart = function(oChart, data) {
    var length = data.length;
    if (length > 0 ) {
      $(oChart.empty).hide();
      $(oChart.total).show();
    } else {
      $(oChart.empty).show();
      $(oChart.total).hide();
    }
    var chartData = [];
    for (var i = 0; i < length; i++) {
      chartData.push({
        value: data[i].value,
        label: data[i].label,
        color: 'hsl(' + (360 * i / length) + ', 100%, 50%)',
        highlight: 'hsl(' + (360 * i / length) + ', 100%, 40%)',
      });
    }
    if (oChart.chart != null) {
      oChart.chart.destroy();
    }
    oChart.chart = new Chart(oChart.canvas).Doughnut(chartData, pieOptions);
    if (oChart.chart.options.animation || oChart.chart.options.animateRotate) {
      $(oChart.legend).css('opacity', 0);
      $(oChart.legend).delay(100).animate({ opacity: 1 }, 500)
      $(oChart.total).css('opacity', 0);
      $(oChart.total).delay(100).animate({ opacity: 1 }, 500)
    }
    $(oChart.legend).html(oChart.chart.generateLegend());
    var total = oChart.chart.total;
    if (total > 10000) {
      total = (total / 10000).toFixed(2) + '万';
    }
    $(oChart.total).html(total);
  };
  
  return {
    init: function(initObj) {
      chartDataUrl = initObj.chartDataUrl;
      
      $('.input-daterange').datepicker({
        format: "yyyy-mm-dd H:i:s",
        todayBtn: "linked",
        language: "cn",
        autoclose: true,
        todayHighlight: true
      });
      
      $(btn7Day).on('click', function() {
        showChart(7);
        $(chartTitleExtra).data('range', $(this).html());
      });
      $(btn1Mon).on('click', function() {
        showChart(30);
        $(chartTitleExtra).data('range', $(this).html());
      });
      $(btn1Year).on('click', function() {
        showChart(365);
        $(chartTitleExtra).data('range', $(this).html());
      });
      $(btnAll).on('click', function() {
        showChart();
        $(chartTitleExtra).data('range', $(this).html());
      });
      $(btnDateRange).on('click', function() {
        var start = $(inputDateStart).val();
        var end = $(inputDateEnd).val();
        if (start && end) {
          showChart('', start, end);
          $(chartTitleExtra).data('range', start + '~' + end);
        } else {
          toastr.warning('请选择起止日期');
        }
      });
      //showChart('', '2015-10-11', '2015-10-21');
      $(btn7Day).click();
    }
  };
})();