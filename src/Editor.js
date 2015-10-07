/**
 * maxdown
 *
 * @file 编辑器类
 * @exports Editor
 * @author mec0825
 */

import u, {$} from './util';
import marked from 'marked';
import keyboardJS from 'keyboardjs';

/**
 * @class Editor
 */
class Editor {
    constructor(input, preview, options={}) {
        this.mjRunning = false;
        this.input = input;
        this.preview = preview;
        this.options = options;

        this.input.value = localStorage.getItem("tmpArticle") || '';
        this.prepare();
    }

    /**
     * 对iframe中的body添加css
     *
     * @public
     * @method Editor#appendCssLink
     */
    appendCssLink(hrefs) {
        if (typeof hrefs === 'string') {
            hrefs = [ hrefs ];
        }

        let doc = this.preview.contentWindow.document;

        hrefs.forEach((href) => {
            let cssLink = document.createElement("link");
            cssLink.href = href;
            cssLink.rel = "stylesheet"; 
            cssLink.type = "text/css"; 
            doc.head.appendChild(cssLink);
        })
    }

    /**
     * 更新iframe
     *
     * @public
     * @method Editor#update
     */
    update() {
        console.log(this.mjRunning)
        if (this.mjRunning) {
            return
        };
        this.mjRunning = true;
        let doc = $("markdown-buffer");
        doc.innerHTML = this.input.value;
        MathJax.Hub.Queue(
            ["Typeset",MathJax.Hub,doc.body],
            [() => {
                this.mjRunning = false;
                let doc = this.preview.contentWindow.document;
                let buffer = $("markdown-buffer");
                let text = buffer.innerHTML;
                text = u.unescape(text);
                doc.body.innerHTML = marked(text);
            }]
        );
        this.preview.contentWindow.document.body.style.padding = '15px';
    }

    /**
     * 跟随左栏滚动
     *
     * @public
     * @method Editor#textareaScroll
     */
    textareaScroll() {
        let body = this.preview.contentWindow.document.body;
        let bodyHeight = body.scrollHeight - body.clientHeight;
        let inputHeight = this.input.scrollHeight - this.input.clientHeight;
        body.scrollTop = this.input.scrollTop / inputHeight * bodyHeight;
    }

    /**
     * 绑定事件
     *
     * @public
     * @method Editor#bindEvents
     */
    bindEvents() {
        this.input.addEventListener('keyup', this.update.bind(this), false);
        this.input.addEventListener('scroll', this.textareaScroll.bind(this), false);
    }

    /**
     * 启用Tab键
     *
     * @public
     * @method Editor#enableTab
     */
    enableTab() {
        this.input.onkeydown = function(e) {
            if (e.keyCode === 9) { // tab was pressed
                let val = this.value,
                    start = this.selectionStart,
                    end = this.selectionEnd;
                // set textarea value to: text before caret + tab + text after caret
                this.value = val.substring(0, start) + '\t' + val.substring(end);
                // put caret at right position again
                this.selectionStart = this.selectionEnd = start + 1;
                // prevent the focus lose
                return false;
            }
        };
    }

    /**
     * 启用command+s和ctrl+s的组合键
     *
     * @public
     * @method Editor#enableKeyboard
     */
    enableKeyboard() {
        keyboardJS.bind(['command + s', 'ctrl + s'], (e) => {
            // 屏蔽浏览器自带保存
            e.preventDefault();
            localStorage.setItem("tmpArticle", this.input.value);
        });
    }

    /**
     * 初始加载预处理
     *
     * @public
     * @method Editor#prepare
     */
    prepare() {
        if (this.options.hrefs) {
            this.appendCssLink(this.options.hrefs);
        }
        if (this.options.tab) {
            this.enableTab();
        }
        if (this.options.keyboard) {
            this.enableKeyboard();
        }
        this.bindEvents();
        this.update();
    }
}

export default Editor;
