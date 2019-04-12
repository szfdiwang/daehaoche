$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        autoplay: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active',
            preventDefault: false,

        },
        // grabCursor: true,

    })
    $(".swiper-pagination-bullets span").hover(function () {
        $(this).click();
    }, function () {
        mySwiper.autoplay.start();
    })

    function initMap() {
        var chart = echarts.init(document.getElementById('mychina'));
        var geoCoordMap = {
            "深圳": [114.07, 22.62],
            "广州": [113.23, 23.36],
            "东莞": [114.75, 23.04],
            "成都": [104.06, 30.67],
            "昆明": [102.73, 25.04],
            "武汉": [114.31, 30.52],
            "长沙": [113, 28.21],
            "重庆": [106.54, 29.59],
            "苏州": [120.62, 31.32],
            "义乌": [120.06, 29.32],
            "南京": [118.78, 32.04],
            "西安": [108.95, 34.27],
            "济南": [117, 36.65],
            "郑州": [112.42, 34.16],
        };

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push(geoCoord.concat(data[i].name, data[i].value));
                }
            }
            return res;
        };

        option = {
            backgroundColor: '#FFFFFF',
            title: {
                // text: '全国主要城市空气质量',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    console.log(params);
                    console.log(params.seriesName + params.data[2]);
                    return params.data[2] + '分公司:</br>' + params.data[3]
                }

            },
            // legend: {
            //     orient: 'vertical',
            //     top: 'bottom',
            //     left: 'right',
            //     data: ['pm2.5'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            // visualMap: {
            //     min: 0,
            //     max: 300,
            //     splitNumber: 5,
            //     color: ['#d94e5d', '#eac736', '#50a3ba'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#aaa'

                    },
                    emphasis: {
                        // areaColor: '#999999',
                        areaColor: '#fff'
                    }
                }
            },
            series: [{
                name: '分公司地址',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData([{
                        name: "东莞",
                        value: '广东省东莞市东城区环球经贸中心主楼2413'
                    },
                    {
                        name: "成都",
                        value: '四川省成都市锦江区紫东楼段39号明宇金融广场1102室'
                    },
                    {
                        name: "昆明",
                        value: '云南省昆明市五华区东风西路11号顺城西塔16楼'
                    },
                    {
                        name: "武汉",
                        value: '湖北省武昌区中北路楚河汉街总部国际A座34楼3408'
                    },
                    {
                        name: "长沙",
                        value: '湖南省长沙市开福区万达广场C1座3113'
                    },
                    {
                        name: "郑州",
                        value: '河南省郑州市郑东新区商务外环23号中科大厦18楼1811室'
                    },
                    {
                        name: "重庆",
                        value: '重庆市渝中区化龙桥企业天地2号楼10楼'
                    },
                    {
                        name: "苏州",
                        value: '江苏省苏州工业园区苏州大道西119号苏悦广场南楼1007室'
                    },
                    {
                        name: "义乌",
                        value: '浙江省义乌市城北路国信证券大厦10楼1004-1005室'
                    },
                    {
                        name: "南京",
                        value: '江苏省南京市秦淮区汉中路1号南京国际金融中心12A'
                    },

                    {
                        name: "济南",
                        value: '山东省济南市市中区万达广场写字楼A座2010'
                    },
                    {
                        name: "总部",
                        value: '广东省深圳市龙华区创业路汇海广场B座25楼'
                    },

                ]),
                legendHoverLink: false,
                color: ['#f6ab00'],
                showEffectOn: 'emphasis',
                symbolSize: 10,
                label: {
                    normal: {
                        color: '#333',
                        formatter: function (params) {
                            return params.data[2]
                        },
                        position: 'right',
                        show: true
                    },
                    shadowBlur: 10,
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },

                }
            }, {
                name: '分公司地址',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData([{
                        name: "广州",
                        value: '广东省广州市天河区华强路1号珠控国际中心1706室'
                    },
                    {
                        name: "西安",
                        value: '陕西省西安市莲湖区永宁门长安国际F座1509'
                    },
                ]),
                legendHoverLink: false,
                color: ['#f6ab00'],
                showEffectOn: 'emphasis',
                symbolSize: 10,
                label: {
                    normal: {
                        color: '#333',
                        formatter: function (params) {
                            return params.data[2]
                        },
                        position: 'top',
                        show: true
                    },
                    shadowBlur: 10,
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },

                }
            }, {
                name: '分公司地址',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData([{
                    name: "深圳",
                    value: '广东省深圳市福田区深南大道2003号华嵘大厦1009'
                }]),
                legendHoverLink: false,
                color: ['#f6ab00'],
                showEffectOn: 'emphasis',
                symbolSize: 10,
                label: {
                    normal: {
                        color: '#333',
                        formatter: function (params) {
                            return params.data[2]
                        },
                        position: 'bottom',
                        show: true
                    },
                    shadowBlur: 10,
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },

                }
            }]
        }

        chart.setOption(option);
        setTimeout(function () {
            window.onresize = function () {
                chart.resize();
            }
        }, 300)

    }
    initMap();

    function setHtmlFontSize() {
        const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const htmlDom = document.getElementsByTagName('html')[0];
        htmlDom.style.fontSize = htmlWidth / 19.2 + 'px';
    };
    setHtmlFontSize();
    $(window).resize(function () {
        setHtmlFontSize();
        initMap();
    });
})


$(".detail-box1 .content-img .naviToJiapei").on('click', function () {
    window.location.href = "./jiapei.html";
})

$(".detail-box1 .content-img .naviToChedai").on('click', function () {
    window.location.href = "./chedai.html";
})

$(".dae-header .logo_left").on('click', function () {
    window.location.href = "./index.html";
})