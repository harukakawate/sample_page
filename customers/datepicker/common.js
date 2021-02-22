/******************************
 テキストボックスでのエンター時submit回避
******************************/
$(document).on('keydown', function (e) {
    if (e.keyCode === 13 && e.target.tagName === 'INPUT') {
        return false;
    }
});

/******************************
 ヘッダーナビゲーション
******************************/
$(document).on('click', '#menuIcon', function () {
    if ($('#menuNav').is(':hidden')) {
        $('#menuIcon').css('background-color', '#eee');
    } else {
        $('#menuIcon').css('background-color', '#000');
    }

    $('#menuNav').toggle(150);
});

$(document).on('click', '#settingIcon', function () {
    if ($('#settingNav').is(':hidden')) {
        $('#settingIcon').css('background-color', '#eee');
    } else {
        $('#settingIcon').css('background-color', '#000');
    }

    $('#settingNav').toggle(150);
});

$(document).on('click', function (event) {
    //ナビゲーションメニュー以外をクリック時、ナビゲーションを非表示にする
    if (!$(event.target).closest('#menuIcon').length && !$(event.target).closest('#menuNav').length) {
        $("#menuIcon").css('background-color', '#000');
        $("#menuNav").hide();
    }

    //設定ナビゲーションメニュー以外をクリック時、設定ナビゲーションを非表示にする
    if (!$(event.target).closest('#settingIcon').length && !$(event.target).closest('#settingNav').length) {
        $("#settingIcon").css('background-color', '#000');
        $("#settingNav").hide();
    }
});

//ログアウト
$(document).on('click', '#logout', function () {
    var form = $(this).parent('form');
    form.submit();
});

/******************************
 カレンダー(datepicker)
******************************/
$(function () {
    $('.datepicker').datepicker({
        //オプション設定
        prevText: '&#x3C;前',
        nextText: '次&#x3E;',
        yearSuffix: '年',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
        dateFormat: 'yy/mm/dd',
        showMonthAfterYear: true,
        firstDay: 0,  // 週初めを日曜日に設定
        showAnim: 'fadeIn',
        beforeShow: function (input, inst) {  // 表示位置をテキストボックス下にする
            var top = $(this).offset().top + $(this).outerHeight();
            var left = $(this).offset().left;
            setTimeout(function () {
                inst.dpDiv.css({
                    'top': top,
                    'left': left
                });
            }, 10);
        }
    });
    $('.datepicker').attr({
        autocomplete: "off"
    });
});


__stt.on('selectLang', function(event) {
    if (event.lang === 'en') {
        $(function () {
        console.log('function')
            $('.datepicker').datepicker({
                //オプション設定
                prevText: "Prev",
                nextText: "Next",
                yearSuffix: "",
                monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
                dayNamesMin: [ "Su","Mo","Tu","We","Th","Fr","Sa" ],
                dateFormat: 'yy/mm/dd',
                showMonthAfterYear: true,
                firstDay: 0,  // 週初めを日曜日に設定
                showAnim: 'fadeIn',
                beforeShow: function (input, inst) {  // 表示位置をテキストボックス下にする
                    var top = $(this).offset().top + $(this).outerHeight();
                    var left = $(this).offset().left;
                    setTimeout(function () {
                        inst.dpDiv.css({
                            'top': top,
                            'left': left
                        });
                    }, 10);
                }
            });
            $('.datepicker').attr({
                autocomplete: "off"
            });
        });
    } else {
        $(function () {
            $('.datepicker').datepicker({
                //オプション設定
                prevText: '&#x3C;前',
                nextText: '次&#x3E;',
                yearSuffix: '年',
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
                dateFormat: 'yy/mm/dd',
                showMonthAfterYear: true,
                firstDay: 0,  // 週初めを日曜日に設定
                showAnim: 'fadeIn',
                beforeShow: function (input, inst) {  // 表示位置をテキストボックス下にする
                    var top = $(this).offset().top + $(this).outerHeight();
                    var left = $(this).offset().left;
                    setTimeout(function () {
                        inst.dpDiv.css({
                            'top': top,
                            'left': left
                        });
                    }, 10);
                }
            });
            $('.datepicker').attr({
                autocomplete: "off"
            });
        });
    }
});

/******************************
 ログインホテルの切替
******************************/
$(document).on('change', '#loginableHotel', function () {
    var newContractNo = $(this).val();
    var nowPage = encodeURIComponent(location.href);

    var url = '../Home/ChangeLoginHotel'
    url += '?newContractNo=' + newContractNo
    url += '&redirectUrl=' + nowPage

    location.href = url;
});
