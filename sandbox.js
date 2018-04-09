var gif = require('./utils/create_gif');

var text = "This is a pen\nI have a apple\n吾輩は猫である"
var vocalo = "ボクは生まれ　そして気づく\n所詮　ヒトの真似事だと\n知ってなおも歌い続く\n永遠（トワ）の命　「VOCALOID」\nすこじずれるのおおおおおおおおおおおおおおおたとえそれが　既存曲を\nなぞるオモチャならば・・・\nそれもいいと決意\nネギをかじり　空を見上げ涙（シル）をこぼす\nだけどそれも無くし気づく\n人格すら歌に頼り\n不安定な基盤の元\n帰る動画（トコ）は既に廃墟\n皆に忘れ去られた時\n心らしきものが消えて\n暴走の果てに見える\n終わる世界...　「VOCALOID」 ";
gif.text_gif("sample.gif", vocalo, 36, 300, 506, 253, 0);
