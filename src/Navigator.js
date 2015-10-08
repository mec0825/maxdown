/**
 * maxdown
 *
 * @file 导航栏类
 * @exports Navigator
 * @author mec0825
 */

import u, {$} from './util';
import {saveAs} from 'filesaver.js';
import markdowncss from '../libs/markdown.css.txt';

/**
 * @class Navigator
 */
class Navigator {
    constructor(editor) {
        this.editor = editor;
        this.prepare();
    }

    /**
     * 选择文件
     *
     * @public
     * @method Navigator#openfilePressed
     */
    openfilePressed() {
        $("fileupload").click();
    }

    /**
     * 读取文件
     *
     * @public
     * @method Navigator#readSingleFile
     */
    readSingleFile(e) {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
            let contents = e.target.result;
            this.editor.input.value = contents;
            this.editor.update();
        };
        reader.readAsText(file);
    }

    /**
     * 保存文章进localStorage
     *
     * @public
     * @method Navigator#saveCachePressed
     */
    saveCachePressed() {
        localStorage.setItem("tmpArticle", this.editor.input.value);
    }

    /**
     * 刷新iframe
     *
     * @public
     * @method Navigator#refreshPressed
     */
    refreshPressed() {
        this.editor.update();
    }

    /**
     * 下载iframe中的html
     *
     * @public
     * @method Navigator#downloadPressed
     */
    downloadPressed() {
        let doc = this.editor.preview.contentWindow.document;
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
     * @method Navigator#bindEvents
     */
    bindEvents() {
        $('upload').addEventListener('click', this.openfilePressed.bind(this), false);
        $('save').addEventListener('click', this.saveCachePressed.bind(this), false);
        $('refresh').addEventListener('click', this.refreshPressed.bind(this), false);
        $('download').addEventListener('click', this.downloadPressed.bind(this), false);
        $('fileupload').addEventListener('change', this.readSingleFile.bind(this), false);
    }

    /**
     * 初始加载预处理
     *
     * @public
     * @method Navigator#prepare
     */
    prepare() {
        this.bindEvents();
    }
}

export default Navigator;
