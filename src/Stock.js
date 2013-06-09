function Stocks()
{
  this.ui = $('<div id="placeholder" class="graph"></div>').appendTo($("body"));

  var container = $("#placeholder");

  // Determine how many data points to keep based on the placeholder's initial size;
  // this gives us a nice high-res plot while avoiding more than one point per pixel.
  var maximum = container.outerWidth() / 2 || 300;

  this.data = [];

  var that = this;
  function getRandomData()
  {
    if (that.data.length)
    {
      that.data = that.data.slice(1);
    }

    while (that.data.length < maximum)
    {
      var previous = that.data.length ? that.data[that.data.length - 1] : 50;
      var y = previous + Math.random() * 10 - 5;
      that.data.push(y < 0 ? 0 : y > 100 ? 100 : y);
    }

    // zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < that.data.length; ++i)
    {
      res.push([i, that.data[i]])
    }

    return res;
  }

  series = [
    {
      data: getRandomData(),
      lines:
      {
        fill: true
      }
    }
  ];

  var plot = $.plot(container, series,
  {
    grid:
    {
      borderWidth: 1,
      minBorderMargin: 20,
      labelMargin: 10,
      margin:
      {
        top: 8,
        bottom: 20,
        left: 20
      },
      markings: function(axes)
      {
        var markings = [];
        var xaxis = axes.xaxis;
        for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2)
        {
          markings.push(
          {
            xaxis:
            {
              from: x,
              to: x + xaxis.tickSize
            },
            color: "rgba(232, 232, 255, 0.0)"
          });
        }
        return markings;
      }
    },
    xaxis:
    {
      tickFormatter: function()
      {
        return "";
      }
    },
    yaxis:
    {
      min: 0,
      max: 110
    },
    legend:
    {
      show: true
    }
  });

  // Update the random dataset at 25FPS for a smoothly-animating chart
  setInterval(function updateRandom()
  {
    series[0].data = getRandomData();
    plot.setData(series);
    plot.draw();
  }, 40);
}

Stocks.prototype.hide = function()
{
  this.ui.css("display", "none");
}

Stocks.prototype.show = function()
{
  this.ui.css("display", "block");
}