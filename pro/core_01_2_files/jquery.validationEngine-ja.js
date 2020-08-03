;/*****************************************************************
 * Japanese language file for jquery.validationEngine.js (ver2.0)
 *
 * Transrator: tomotomo ( Tomoyuki SUGITA )
 * http://tomotomoSnippet.blogspot.com/
 * Licenced under the MIT Licence
 *******************************************************************/
(function($){
    /* -- 20170904 add -- */
    $(function()
    {
        //必須
    	$(".ss_notnull").parent().next("td").find("input, select, textarea").addClass("validate[required]");
    	//[1]全角のみ
    	$(".validate1").find("input, select, textarea").addClass("validate[custom[onlyZen]]");
    	//[2]半角数字のみ
    	$(".validate2").find("input, select, textarea").addClass("validate[custom[onlyNumberSp]]");
    	//[3]E-mailアドレスのみ
    	$(".validate3").find("input, select, textarea").addClass("validate[custom[email]]");
    	//[4]URL形式のみ
    	$(".validate4").find("input, select, textarea").addClass("validate[custom[url]]");
    	//[5]電話番号形式のみ
    	$(".validate5").find("input, select, textarea").addClass("validate[custom[tel]]");
    	//[6]全角カタカナのみ
    	$(".validate6").find("input, select, textarea").addClass("validate[custom[onlyKana]]");
    	//[7]半角英数字のみ
    	$(".validate7").find("input, select, textarea").addClass("validate[custom[onlyLetterNumber]]");
      // 日付型
      $(".hasDatepicker").each(function()
      {
        $(this).addClass("validate[custom[date]]");
        $(this).addClass("validate[custom[dateExist]]");
        $(this).addClass("validate[custom[dateyear]]");
      });

      // 日時型
      $("input[type='datetime-local']").each(function()
      {
        $(this).addClass("validate[custom[datetime]]");
        $(this).addClass("validate[custom[datetimeExist]]");
        $(this).addClass("validate[custom[datetimeyear]]");
      });

    });
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "必ず入力してください",
                    "alertTextCheckboxMultiple": "必ず入力してください",
                    "alertTextCheckboxe": "必ず入力してください"
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "文字以上にしてください"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "文字以下にしてください"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 以上の数値にしてください"
                },
                "max": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " 以下の数値にしてください"
                },
                "past": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " より過去の日付にしてください"
                },
                "future": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": " より最近の日付にしてください"
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "チェックしすぎです"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* ",
                    "alertText2": "つ以上チェックしてください"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "入力された値が一致しません"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "無効なクレジットカード番号"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                    "alertText": "電話番号が正しくありません"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "入力形式を確認してください"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "整数を半角で入力してください"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "数値を半角で入力してください"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    // "alertText": "日付は半角で YYYY-MM-DD の形式で入力してください"
                    "alertText": "入力形式を確認してください"
                },
                "dateyear": {
                  "regex": /^(190[2-9]|19[1-9][0-9]|20[0-2][0-9]|203[0-7])[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                  "alertText": "1902年～2037年に設定してください"
                },
                "dateExist": {
                    "func": function(field, rules, i, options){
                        var dflg   = true;
                        var dchk   = field.val();
                        var cYear  = +dchk.split('-')[0];
                        var cMonth = +dchk.split('-')[1];
                        var cDay   = +dchk.split('-')[2];
                        var dd     = new Date(cYear, cMonth - 1, cDay);
                        if(!((dd.getFullYear() == cYear) && (dd.getMonth() == cMonth - 1) && (dd.getDate() == cDay))) {
                            dflg = false;
                        }
                        return dflg;
                    },
                    "alertText": "入力形式を確認してください"
                },
                "datetime": {
                    // "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]).([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])(T|\s)(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[0-5][0-9])(:(0?[0-9]|[0-5][0-9]))*$/,
                    "alertText": "入力形式を確認してください"
                },
                "datetimeyear": {
                    "regex": /^(190[2-9]|19[1-9][0-9]|20[0-2][0-9]|203[0-7])[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])(T|\s)(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[0-5][0-9])(:(0?[0-9]|[0-5][0-9]))*$/,
                    "alertText": "1902年～2037年に設定してください"
                },
                "datetimeExist": {
                    "func": function(field, rules, i, options){
                        var dflg   = true;
                        var dchk   = field.val();
                        var cYear  = +dchk.split('-')[0];
                        var cMonth = +dchk.split('-')[1];
                        var cDay   = dchk.split('-')[2];
                        if(cDay){
                            cDay = +cDay.split(/T|\s/g)[0];
                        }
                        var dd     = new Date(cYear, cMonth - 1, cDay);
                        if(!((dd.getFullYear() == cYear) && (dd.getMonth() == cMonth - 1) && (dd.getDate() == cDay))) {
                            dflg = false;
                        }
                        return dflg;
                    },
                    "alertText": "入力形式を確認してください"
                },
                "ipv4": {
                	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "IPアドレスが正しくありません"
                },
                "url": {
                    "regex": /^(https?|ftp)(:\/\/[-_.!~*¥'()a-zA-Z0-9;\/?:\@&=+\\,%#]+)$/,
                    "alertText": "入力形式を確認してください"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "半角数字で入力してください"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "半角アルファベットで入力してください"
                },
                "onlyLetterNumber": {
                    "regex": /^[a-zA-Z0-9 -/:-@\[-\`\{-\~]+$/,
                    "alertText": "半角英数字で入力してください"
                },
				"onlyKana": {
                    "regex": /^[ァ-ヶー]+$/,
                    "alertText": "全角カタカナで入力してください"
                },
				"onlyZen": {
                    "regex": /^[^ -~｡-ﾟ]*$/,
                    "alertText": "全角で入力してください"
                },
				"tel": {
                    "regex": /^[\+]?[\d]+([\-][\d]+){1,5}$/,
                    "alertText": "ハイフン[-]を入れ、半角数字で入力してください"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                "validate2fields": {
                    "alertText": "* 『HELLO』と入力してください"
                }
            };

        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
