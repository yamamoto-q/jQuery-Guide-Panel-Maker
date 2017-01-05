# jQuery-Guide-Panel-Maker
Questetra BPM Suite のガイドパネルについて、サクッとメリハリのあるHTMLが作成できます。

## デモ
https://cdn.rawgit.com/yamamoto-q/jQuery-Guide-Panel-Maker/master/test.html

## 利用サンプル
jQueryのプラグインとして適用します。

    <html>
      <head>
        <meta charset="UTF-8" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      </head>
    <body>
      <div id="Hoge"></div>
      <link rel="stylesheet" href="dist/jquery.q_guide_panel_maker.min.css" media="screen"></style>
      <script type="text/javascript" src="dist/jquery.q_guide_panel_maker.js"></script>
      <script type="text/javascript">
        (function($) {
          $("#Hoge").q_guide_panale_maker();
        })(jQuery);
      </script>
    </body>
  </html>

## オプション
オプションには以下が利用できます。

    {
    'h' : 10,
    's' : 3,
    'v' : 4,
    'section_setting':'設定',
    'title_label' : 'タイトル',
    'title': '神ってる',
    'size_label' : 'タイトル文字サイズ',
    'color_label' : 'タイトル文字色',
    'bg_label' : 'タイトルの背景色',
    'padding_label' : 'パディング',
    'padding_help' : 'タイトルバーとタイトル文字の間のスペースです',
    'margin_label' : 'マージン',
    'margin_help' : 'タイトルバーの下に設ける余白です',
    'disc_label' : '注釈',
    'disc': '「神懸かってる」と言うところを緒方孝市監督は、いまどきの言葉を使って「神ってる」と口にした。',
    'title_help' : '必要ない場合には空にしてください',
    'disc_help' : '必要ない場合には空にしてください。改行も使用できます。',
    'section_preview' : 'プレビュー',
    'section_code' : 'コード',
    'code_help' : '下記のコードをコピーしてご利用下さい'
    }
    
h,s,v はカラーピッカーの色数を生成する際に使用するHSV値の分割数です。
