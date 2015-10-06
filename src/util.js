/**
 * maxdown
 *
 * @file 工具库
 * @exports util
 * @author mec0825
 */

let util = {};

/**
 * 编码html文本
 *
 * @param {string} html HTML文本
 * @return {string}
 */
util.escape = (html) => {
    return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * 解码html文本
 *
 * @param {string} html HTML文本
 * @return {string}
 */
util.unescape = (html) => {
    return html
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '\"')
    .replace(/&#39;/g, '\'');
}

/**
 * ID选择器
 *
 * @param {string} id HTML中id元素
 * @return {HTMLElement}
 */
util.$ = (id) => {
    return document.getElementById(id);
}

export default util;
