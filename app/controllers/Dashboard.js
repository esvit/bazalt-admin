define('controllers/Dashboard', [
    'app',

    'jflot.time'
], function (app) {
    'use strict';

    function parseDate(input) {
        var parts = input.match(/(\d{4})-(\d{2})-(\d{2})/);

        return new Date(parts[1], parts[2] - 1, parts[3]);
    }

    app.controller('Backend.Controllers.Dashboard', ['$scope', 'bcPages.Factories.Page',
        function ($scope, PageResource) {
            PageResource.get({'action': 'statistic'}, function (result) {
                var visits = [];
                for (var date in result.data) {
                    var day = parseDate(date),
                        data = [ day, result.data[date].count, date ],
                        inserted = false;

                    for (var j = 0, max = visits.length; j < max; j++) {
                        if (visits[j].label == result.data[date].user_name) {
                            visits[j].data.push(data);
                            inserted = true;
                            break;
                        }
                    }
                    if (!inserted) {
                        visits.push({
                            label: result.data[date].user_id,
                            data: [data]
                        });
                    }
                }

                $('#posts_statistic').css({
                    height: '150px',
                    width: '100%'
                });
                $.plot($('#posts_statistic'), visits, {
                    shadowSize: 0,
                    colors: ["#25A510", '#0077CC'],
                    xaxes: [
                        { mode: 'time', color: '#25A510', timeFormat: "%d-%m-%y", minTickSize: [1, 'day'] }
                    ],
                    lines: { show: true, fill: true, lineWidth: 4, colors: ['rgba(37, 165, 16, 0.2)', 'rgba(230, 242, 250, 0.5)'] },
                    points: {
                        show: true,
                        fillColor: "#FFFFFF",
                        fill: false,
                        radius: 4,
                        lineWidth: 1,
                        //colors: ["#25A510", '#0077CC'],
                        symbol: function (ctx, x, y, radius, shadow) {
                            ctx.beginPath();
                            ctx.lineWidth = 1;
                            ctx.arc(x, y, 3, 0, shadow ? Math.PI : Math.PI * 2, false);
                            ctx.closePath();

                            ctx.fillStyle = '#0077CC';
                            ctx.fill();

                            ctx.stroke();

                            ctx.beginPath();
                            ctx.strokeStyle = '#FFFFFF';
                            ctx.lineWidth = 1;
                            ctx.arc(x, y, 4, 0, shadow ? Math.PI : Math.PI * 2, false);
                            ctx.closePath();
                        }
                    },
                    legend: {
                        container: $("#legend")
                    },
                    grid: { hoverable: true, backgroundColor: '#FFF', borderWidth: 0, tickColor: '#E7E7E7' }
                });

            })
        }]);
});