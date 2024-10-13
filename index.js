const ejs = require('ejs');
const fs = require('fs');
const { marked } = require('marked');

// 热更行实例
let browser;
const browserSync = require('browser-sync')
const server = () => {
    browser = browserSync.create()
    browser.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
}


const init = (callback) => {
    // 读取 md 的内容
    const md = fs.readFileSync('test.md', 'utf-8');

    // 将 md 中的内容转出 html 形式 并插入 html 中
    ejs.renderFile('template.ejs', {
        title: 'markdown to html',
        content: marked.parse(md)
    }, (err, data) => {
        if (err) throw err;
        fs.writeFileSync('index.html', data)

        // 创建一个热更新服务
        // server();
        callback && callback()

    })
}

// 监听文件
fs.watchFile('test.md', (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        // 重新刷新，避免再起一个服务
        init(() => browser.reload())
    }

})

// 初始化，打开服务
init(() => {
    server()
});
