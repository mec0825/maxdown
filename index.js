/**
 * maxdown
 *
 * @file 主文件入口
 * @exports 无
 * @author mec0825
 */

import marked from 'marked';
import Editor from './src/Editor';
import {saveAs} from 'filesaver.js';
import u, {$} from './src/util';
import markdowncss from './libs/markdown.css.txt';

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

/**
 * 选择文件
 *
 * @public
 */
let openfilePressed = () => {
    $("fileupload").click();
}

/**
 * 读取文件
 *
 * @public
 */
let readSingleFile = (e) => {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = (e) => {
        let contents = e.target.result;
        input.value = contents;
        editor.update();
    };
    reader.readAsText(file);
}

/**
 * 保存文章进localStorage
 *
 * @public
 */
let saveCachePressed = () => {
    localStorage.setItem("tmpArticle", input.value);
}

/**
 * 刷新iframe
 *
 * @public
 */
let refreshPressed = () => {
    editor.update();
}

/**
 * 下载iframe中的html
 *
 * @public
 */
let downloadPressed = () => {
    let doc = preview.contentWindow.document;
    let bodyText = doc.body.innerHTML;

    let htmlText = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${markdowncss}</style>
                <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/styles/default.min.css">
                <script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/highlight.min.js"></script>
            </head>
            <body>
                ${bodyText}
            </body>
        </html>
    `;

    let blob = new Blob([htmlText], {
        type: "text/plain;charset=utf-8"
    });

    saveAs(blob, "publish.html");
}

/**
 * 绑定事件
 *
 * @public
 */
let bindEvents = () => {
    $('upload').addEventListener('click', openfilePressed, false);
    $('save').addEventListener('click', saveCachePressed, false);
    $('refresh').addEventListener('click', refreshPressed, false);
    $('download').addEventListener('click', downloadPressed, false);
    $('fileupload').addEventListener('change', readSingleFile, false);
};

let editor = new Editor(input, preview, options);
bindEvents();
