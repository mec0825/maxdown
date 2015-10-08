/**
 * maxdown
 *
 * @file 主文件入口
 * @exports 无
 * @author mec0825
 */

import marked from 'marked';
import Editor from './src/Editor';
import Navigator from './src/Navigator';
import u, {$} from './src/util';

let input = $('pad');
let preview = $('markdown');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    // markdown 解释器对代码高亮的设置
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

let options = {
    hrefs: [
        './libs/markdown.css',
        './libs/highlight/styles/default.css',
    ],
    tab: true,
    keyboard: true,
}

let editor = new Editor(input, preview, options);
let navbar = new Navigator(editor);
