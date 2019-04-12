var TempArr = [];
var selectId = "";
var countdown;
(function () {
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

  function setHtmlFontSize() {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 19.2 + 'px';
  };
  setHtmlFontSize();
  $(window).resize(function () {
    setHtmlFontSize();
  });
})();



function getSchoolAction() {
  $.ajax({
    contentType: "application/json;charset=UTF-8",
    type: 'POST',
    headers: {
      Authorization: localStorage.token
      // "Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI="
      // test Basic ZXJvbmcteXJwaC1hcHAtY2xpZW50LXNpdDpjYWMzNDg3MjM2NDM0NzY2OWQwNWMxOTM4YjAyNGM0OA==
      // pro Basic ZXJvbmdfMTAwMDUwMDE6YjcxNDczNmFlZTJhNDY3MWJlNWM2YzllYTI3ZDJlYmI=
    },
    data: JSON.stringify({
      "cooperationType": "01"
    }),
    url: urlToken + 'erong-cfss-pbes/pbes/channel/queryChannelNameList',
    dataType: 'JSON',
    success: function (msg) {
      console.log(msg);
      if (msg.resultCode == "1") {
        TempArr = msg.data.channelNameList
      } else {
        console.log('查询驾校失败');
      }
    },
    error: function (msg) {
      console.log(msg);
    }
  });
}
getSchoolAction();


$(function () {
  /*先将数据存入数组*/
  // $("#schoolSelect option").each(function (index, el) {
  //   TempArr[index] = $(this).text();
  // });
  $(document).bind('click', function (e) { //点击空白处的消失处理
    var e = e || window.event; //浏览器兼容性     
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素     
      if (elem.id && (elem.id == 'schoolSelect' || elem.id == "schoolInput")) {
        return;
      }
      elem = elem.parentNode;
    }
    $('#schoolSelect').css('display', 'none'); //点击的不是div或其子元素     
  });
})

function changeF(this_) {
  $(this_).prev("input").val($(this_).find("option:selected").text());
  $("#schoolSelect").css({
    "display": "none"
  });
  $("#schoolInput").val();
  for (i = 0; i < TempArr.length; i++) {
    if ($("#schoolInput").val() == TempArr[i].channelName) {
      selectId = TempArr[i].channelNo;
    }
  }
}

function setfocus(this_) {
  $("#schoolSelect").css({
    "display": "block"
  });
  var select = $("#schoolSelect");
  for (i = 0; i < TempArr.length; i++) {
    var option = $("<option></option>").text(TempArr[i].channelName) //.attr("id", TempArr[i].channelNo);
    select.append(option);
  }
}

function setinput(this_) {
  var select = $("#schoolSelect");
  select.html("");
  for (i = 0; i < TempArr.length; i++) {
    //若找到以txt的内容开头的，添option  
    if (TempArr[i].channelName.substring(0, this_.value.length).indexOf(this_.value) == 0) {
      var option = $("<option></option>").text(TempArr[i].channelName).attr("id", TempArr[i].channelNo);;
      select.append(option);
    }
    if ($("#schoolInput").val() == TempArr[i].channelName) {
      selectId = TempArr[i].channelNo;
    } else {
      selectId = "";
    }
  }
}
$(".dae-header .logo_left").on('click', function () {
  window.location.href = "./index.html";
})
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
  var name = $(".name").val();
  var mobile = $(".phone").val();
  var code = $(".code").val();
  var province = $("#province option:selected").text();
  var city = $("#city option:selected").text();
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
  // if (selectId == "") {
  //   $(".StateImg img").attr('src', 'images/failure.png');
  //   $(".StateTxt").html('请输入正确的驾校名称！');
  //   $(".tips").fadeIn();
  //   return false;
  // }
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
    url: urlJson + "erong-cfss-tpms/loanIntention/intention",
    dataType: "JSON",
    headers: {
      Authorization: token
    },
    data: JSON.stringify({
      "name": name,
      "cellPhone": mobile,
      "provinceName": province,
      "cityName": city,
      "validCode": code,
      //"dealerId": selectId // 改为选择模式 request["channelID"]
    }),
    success: function (msg) {
      if (msg.responseCode == '001') {
        $(".StateImg img").attr('src', 'images/succeed.png');
        $(".StateTxt").html(msg.responseMsg);
        $(".tips").fadeIn();
        $(".name").val("");
        $(".phone").val("");
        $(".code").val("");
        $(".school").val("");
        clearInterval(countdown);
        $(".org").val("获取验证码").removeAttr("disabled");
        $("#province").val("请选择");
        $("#city").find("option").remove();
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

if (urlToken == "http://www.daehaoche.com/asssets/inner/") {
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