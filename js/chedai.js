$(document).ready(function () {
    function initSession() {
        $.ajax({
            type: 'get',
            headers: {
                Authorization: "Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI="
                // test Basic ZXJvbmcteXJwaC1hcHAtY2xpZW50LXNpdDpjYWMzNDg3MjM2NDM0NzY2OWQwNWMxOTM4YjAyNGM0OA==
                // pro Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI=
            },
            url: urlToken + "/auth/oauth/token?grant_type=client_credentials",
            dataType: 'JSON',
            success: function (msg) {
                token = "bearer " + msg.access_token;
                localStorage.token = token;
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    initSession();

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
        on: {
            slideChange: function () {
                console.log(this.activeIndex);
            },
        },
    })

    function setHtmlFontSize() {
        const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const htmlDom = document.getElementsByTagName('html')[0];
        htmlDom.style.fontSize = htmlWidth / 19.2 + 'px';
    };
    setHtmlFontSize();
    $(window).resize(function () {
        setHtmlFontSize();
    });
})
// 
$(".dae-header .logo_left").on('click', function () {
    window.location.href = "./index.html";
})
// (function () {
//     $.ajax({
//         type: 'get',
//         headers: {
//             Authorization: "Basic ZXJvbmcteXJwaC1hcHAtY2xpZW50LXNpdDpjYWMzNDg3MjM2NDM0NzY2OWQwNWMxOTM4YjAyNGM0OA=="
//             // test Basic ZXJvbmcteXJwaC1hcHAtY2xpZW50LXNpdDpjYWMzNDg3MjM2NDM0NzY2OWQwNWMxOTM4YjAyNGM0OA==
//             // pro Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI=
//         },
//         url: urlToken + "/auth/oauth/token?grant_type=client_credentials",
//         dataType: 'JSON',
//         success: function (msg) {
//             token = "bearer " + msg.access_token;
//             localStorage.token = token;
//         },
//         error: function (msg) {
//             console.log(msg);
//         }
//     });
// })();
var countdown;
var fnProvince = document.getElementById("province");
for (var i = 0; i < arrCity.RECORDS.length; i++) {
    if (arrCity.RECORDS[i].level == "SHENG") {
        var opt = document.createElement("option");
        opt.value = arrCity.RECORDS[i].id;
        opt.innerText = arrCity.RECORDS[i].province;
        fnProvince.appendChild(opt);
    }
}
$("#province").on('change', function () {
    $("#city").find("option").remove();
    var province = $("#province option:selected").text();
    var fnCity = document.getElementById("city");
    for (var j = 0; j < arrCity.RECORDS.length; j++) {
        if (arrCity.RECORDS[j].level == 'SHI' && arrCity.RECORDS[j].province == province) {
            var opt = document.createElement("option");
            if (arrCity.RECORDS[j].city == '市辖区' || arrCity.RECORDS[j].city == '县') {
                opt.value = arrCity.RECORDS[j].id;
                opt.innerText = arrCity.RECORDS[j].province;
                fnCity.appendChild(opt);
            } else {
                opt.value = arrCity.RECORDS[j].id;
                opt.innerText = arrCity.RECORDS[j].city;
                fnCity.appendChild(opt);
            }
        }
    }
});

$(".org").click(function () {
    var mobile = $(".phone").val();
    // var name = $(".phone").val();
    if (mobile == "") {
        $(".StateImg img").attr('src', 'images/failure.png');
        $(".StateTxt").html('请您输入手机号码！');
        $(".tips").fadeIn();
        return false;
    } else {
        if (!(/^1[345678]\d{9}$/.test(mobile))) {
            $(".StateImg img").attr('src', 'images/failure.png');
            $(".StateTxt").html('手机号码有误，请重新输入！');
            $(".tips").fadeIn();
            return false;
        } else {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                url: urlJson + "erong-cfss-tpms/loanApply/getValidCode",
                dataType: "JSON",
                headers: {
                    Authorization: token
                },
                data: JSON.stringify({
                    "mobilePhone": mobile
                }),
                success: function (msg) {
                    if (msg.responseCode == '001') {
                        var count = 60;

                        function CountDown() {
                            $(".org").attr("disabled", true);
                            $(".org").val(count + "秒后重新获取");
                            if (count == 0) {
                                $(".org").val("获取验证码").removeAttr("disabled");
                                clearInterval(countdown);
                            }
                            count--;
                        }
                        countdown = setInterval(CountDown, 1000);
                    } else if (msg.responseCode == '002') {
                        $(".StateImg img").attr('src', 'images/failure.png');
                        $(".StateTxt").html('操作频繁，请稍候再试！');
                        $(".tips").fadeIn();
                        return false;
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }
    }

})

$(".submitInfo").on('click', function () {
    var name = $(".phone").val();
    var mobile = $(".phone").val();
    var code = $(".code").val();
    var province = $("#province option:selected").text();
    var cityName = $("#city option:selected").text();
    var city = $("#city option:selected").val();
    if (name == "") {
        $(".StateImg img").attr('src', 'images/failure.png');
        $(".StateTxt").html('请输入您的姓名！');
        $(".tips").fadeIn();
        return false;
    }
    if (mobile == "") {
        $(".StateImg img").attr('src', 'images/failure.png');
        $(".StateTxt").html('请您输入手机号码！');
        $(".tips").fadeIn();
        return false;
    } else {
        if (!(/^1[345678]\d{9}$/.test(mobile))) {
            $(".StateImg img").attr('src', 'images/failure.png');
            $(".StateTxt").html('手机号码有误，请重新输入！');
            $(".tips").fadeIn();
            return false;
        }
    }
    if (code == "") {
        $(".StateImg img").attr('src', 'images/failure.png');
        $(".StateTxt").html('请输入验证码！');
        $(".tips").fadeIn();
        return false;
    } else {
        if (code.length < 6) {
            $(".StateImg img").attr('src', 'images/failure.png');
            $(".StateTxt").html('验证码不能小于6位数字');
            $(".tips").fadeIn();
            return false;
        }
    }

    if (province == "请选择") {
        $(".StateImg img").attr('src', 'images/failure.png');
        $(".StateTxt").html('请选择城市！');
        $(".tips").fadeIn();
        return false;
    }
    var url = window.location.search;
    var request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        url: urlJson + "erong-cfss-tpms/loanClue/loanClueApplyHome",
        dataType: "JSON",
        headers: {
            Authorization: token
        },
        data: JSON.stringify({
            "name": name,
            "mobilePhone": mobile,
            "provinceName": province,
            "regionId": city,
            "validCode": code,
            "channelID": "1111",
            "applySerialNo": new Date().getTime() + Math.floor(Math.random() * 10 + 1)
        }),
        success: function (msg) {
            if (msg.responseCode == '001') {
                $(".StateImg img").attr('src', 'images/succeed.png');
                $(".StateTxt").html("意向申请成功!");
                $(".tips").fadeIn();

                $(".phone").val("");
                $(".code").val("");
                $("#province").val("请选择");
                clearInterval(countdown);
                $(".org").val("获取验证码").removeAttr("disabled");
                $("#city").find("option").remove();
                // window.location.reload();
            } else if (msg.responseCode == '301004') {
                $(".StateImg img").attr('src', 'images/succeed.png');
                $(".StateTxt").html("请勿重复提交!");
                $(".tips").fadeIn();
            } else {
                // $(".StateImg img").attr('src', 'images/succeed.png');
                $(".StateTxt").html(msg.responseMsg);
                $(".tips").fadeIn();
            }
        },
        error: function (msg) {
            $(".StateImg img").attr('src', 'images/failure.png');
            $(".StateTxt").html(msg.responseMsg);
            $(".tips").fadeIn();
        }
    })
});
if (urlToken == "http://www.daehaoche.com/asssets/inner/") { // 生产环境才调取百度地图
    var getlocation = new BMap.Geolocation();
    getlocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            lat = r.point.lat;
            lng = r.point.lng;
            city = r.address.province;
            $("#province option:selected").text(r.address.province)
            $("#city option:selected").text(r.address.city)
        }
    })
}
$(".tipsTitle,.StateInput span").on('click', function () {
    $(".tips").fadeOut();
});