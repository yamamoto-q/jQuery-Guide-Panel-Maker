(function($) {
    $.fn.q_guide_panale_maker = function(options) {

        /* HSVからRGBを返す */
        function HSVtoRGB(h, s, v) {
            var r, g, b; // 0..255

            while (h < 0) {
                h += 360;
            }

            h = h % 360;

            // 特別な場合 saturation = 0
            if (s == 0) {
                // → RGB は V に等しい
                v = Math.round(v);
                return { 'r': v, 'g': v, 'b': v };
            }

            s = s / 255;

            var i = Math.floor(h / 60) % 6,
                f = (h / 60) - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s)

            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
            }

            return { 'r': Math.round(r), 'g': Math.round(g), 'b': Math.round(b) };
        }

        /* HTMLをエスケープする */
        function escapeHtml(str) {
            var escapeMap = {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;'
            };
            var escapeReg = '[';
            var reg;
            for (var p in escapeMap) {
                if (escapeMap.hasOwnProperty(p)) {
                    escapeReg += p;
                }
            }
            escapeReg += ']';
            reg = new RegExp(escapeReg, 'g');


            str = (str === null || str === undefined) ? '' : '' + str;
            return str.replace(reg, function(match) {
                return escapeMap[match];
            });
        }

        /**
         * 色リストを生成;
         * ループでHSVを回してRGBを得て、HEXに変換して詰める
         **/
        var colorIndex = [];

        function buildColors() {
            var c = [];

            var maxRowLength = 0;
            for (var v = 0; v <= 255; v += (255 / 4)) {
                var row = [];
                for (var h = 360; h >= 0; h -= (360 / 10)) {
                    for (var s = 0; s <= 255; s += (255 / 3)) {
                        var rgb = HSVtoRGB(h, s, v);
                        var r16 = ("00" + (rgb.r).toString(16)).slice(-2);
                        var g16 = ("00" + (rgb.g).toString(16)).slice(-2);
                        var b16 = ("00" + (rgb.b).toString(16)).slice(-2);
                        var hex = "#" + r16 + g16 + b16;
                        if (c.indexOf(hex) == -1) {
                            c.push(hex);
                            row.push(hex);
                        }
                    }
                }
                colorIndex.push(row);
                if (maxRowLength < row.length) {
                    maxRowLength = row.length;
                }
                row = [];
            }
        }
        buildColors();

        /**
         * カラーピッカーを生成する
         **/
        function buildColorPicker(id) {
            var $colorPicker = $('<div id="' + id + '"class="qgpm-color-picker"/>');
            for (var i = 0; i < colorIndex.length; i++) {
                var row = colorIndex[i];
                var width = 100 / (row.length);
                var $rowElem = $('<div class="qgpm-color-picker-row"/>');
                for (var ii = 0; ii < row.length; ii++) {
                    $rowElem.append('<div class="qgpm-color-option" style="width:' + width + '%;background-color:' + row[ii] + ';float:left;" data-color="' + row[ii] + '"></div>');
                }
                $colorPicker.append($rowElem);
            }
            return $colorPicker;
        }

        // -------------------------------------------------------------------------------
        var $me = $(this);
        var settings = $.extend({
            'title': '神ってる',
            'disc': '「神懸かってる」と言うところを緒方孝市監督は、いまどきの言葉を使って「神ってる」と口にした。'
        }, options);

        $me.addClass('qgpm');

        // DOM生成
        var $inputTitle = $('<div class="qgpm-input-group" />');
        $inputTitle.append('<label class="qgpm-label" for="qgpm-input-title">タイトル</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append('<input type="text" id="qgpm-input-title" class="qgpm-input" value="' + settings.title + '"/>');
        $input.append('<div class="qgpm-input-help">必用ない場合には空にしてください</div>');
        $inputTitle.append($input);

        var $inputSize = $('<div class="qgpm-input-group" />');
        $inputSize.append('<label class="qgpm-label" for="qgpm-input-size">タイトル文字サイズ</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append('<input type="number" id="qgpm-input-size" class="qgpm-input" value="13"/>');
        $inputSize.append($input);

        var $inputTitleColor = $('<div class="qgpm-input-group" />');
        $inputTitleColor.append('<label class="qgpm-label">タイトル文字色</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append(buildColorPicker("title-color-picker"));
        $inputTitleColor.append($input);

        var $inputBGColor = $('<div class="qgpm-input-group" />');
        $inputBGColor.append('<label class="qgpm-label">タイトルの背景色</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append(buildColorPicker("title-bg-color-picker"));
        $inputBGColor.append($input);

        var $inputPadding = $('<div class="qgpm-input-group" />');
        $inputPadding.append('<label class="qgpm-label" for="qgpm-input-padding">パディング</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append('<input type="number" id="qgpm-input-padding" class="qgpm-input" value="3"/>');
        $input.append('<div class="qgpm-input-help">タイトルバーとタイトル文字の間のスペースです</div>');
        $inputPadding.append($input);

        var $inputMargin = $('<div class="qgpm-input-group" />');
        $inputMargin.append('<label class="qgpm-label" for="qgpm-input-margin">マージン</label>');
        var $input = $('<div class="qgpm-inputs"/>');
        $input.append('<input type="number" id="qgpm-input-margin" class="qgpm-input" value="3"/>');
        $input.append('<div class="qgpm-input-help">タイトルバーの下に設ける余白です</div>');
        $inputMargin.append($input);

        var $inputDisc = $('<div class="qgpm-input-group" />');
        $inputDisc.append('<label class="qgpm-label" for="qgpm-input-title">注釈</label>');
        var $input = $('<div class="qgpm-inputs"/>')
        $input.append('<textarea id="qgpm-input-disc" class="qgpm-input">' + settings.disc + '</textarea>');
        $input.append('<div class="qgpm-input-help">必用ない場合には空にしてください。改行も使用できます。</div>');
        $inputDisc.append($input);

        var $settingArea = $('<div class="qgpm-section qgpm-setting-form"/>');
        $settingArea.append('<h3 class="qgpm-section-title">設定</h3>');
        $settingArea.append($inputTitle);
        $settingArea.append($inputSize);
        $settingArea.append($inputTitleColor);
        $settingArea.append($inputBGColor);
        $settingArea.append($inputPadding);
        $settingArea.append($inputMargin);

        var $previewArea = $('<div class="qgpm-section qgpm-preview-wrapper"/>');
        $previewArea.append('<h3 class="qgpm-section-title">プレビュー</h3>');
        $previewArea.append('<div id="qgpm-prebiew" />');

        var $codeArea = $('<div class="qgpm-section qgpm-code-wrapper"/>');
        $codeArea.append('<h3 class="qgpm-section-title">コード</h3>');
        $codeArea.append('<div class="qgpm-input-help">下記のコードをコピーしてご利用下さい。</div>');
        $codeArea.append('<code id="qgpm-code" />');

        $me.append($settingArea);
        $me.append($inputDisc);
        $me.append($previewArea);
        $me.append($codeArea);

        // ピッカーの初期設定とイベント
        var titleBackGroundColor = "#198000";
        $("#title-bg-color-picker .qgpm-color-option[data-color='" + titleBackGroundColor + "']").addClass('selected');
        $("#title-bg-color-picker .qgpm-color-option").click(function(event) {
            var color = $(this).data('color');
            $("#title-bg-color-picker .qgpm-color-option").removeClass('selected');
            $(this).addClass('selected');
            console.log(color);
            titleBackGroundColor = color;
            make();
        });

        var titleColor = "#ffffff";
        $("#title-color-picker .qgpm-color-option[data-color='" + titleColor + "']").addClass('selected');
        $("#title-color-picker .qgpm-color-option").click(function(event) {
            var color = $(this).data('color');
            $("#title-color-picker .qgpm-color-option").removeClass('selected');
            $(this).addClass('selected');
            console.log(color);
            titleColor = color;
            make();
        });

        // イベント
        $('#qgpm-input-title').keyup(function() {
            make();
        });
        $('#qgpm-input-disc').keyup(function() {
            make();
        })
        $('#qgpm-input-padding').change(function() {
            make();
        })
        $('#qgpm-input-size').change(function() {
            make();
        });
        $('#qgpm-input-margin').change(function() {
            make();
        })

        // コード生成
        var make = function() {
            var title = $("#qgpm-input-title").val();
            var disc = $("#qgpm-input-disc").val();
            var padding = $("#qgpm-input-padding").val();
            var size = $('#qgpm-input-size').val();
            var margin = $('#qgpm-input-margin').val();

            var titleElem = '<h4 style="font-size:' + size + 'px;background-color:' + titleBackGroundColor + ';color:' + titleColor + ';padding:' + padding + 'px;margin-bottom:' + margin + 'px;">' + title + '</h4>';

            $("#qgpm-prebiew").html("");
            if (title.length > 0) {
                $("#qgpm-prebiew").append(titleElem);
            }
            if (disc.length > 0) {
                var $disc = disc.replace(/[\n\r]/g, "<br />");
                $('#qgpm-prebiew').append($disc);
            }

            var code = escapeHtml($("#qgpm-prebiew").html());

            $("#qgpm-code").html(code);

        };

        // 初期コード生成
        make();

    };
})(jQuery);
