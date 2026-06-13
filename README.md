# X-Copy-Link

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

X.com / Twitter 帖子一键复制链接油猴脚本。

在首页推荐流、搜索列表等每条帖子的操作栏中添加 **复制链接** 按钮，无需点进详情页即可复制帖子链接。

---

A Tampermonkey userscript that adds a **Copy Link** button to every tweet's action bar on X.com — no need to open the tweet detail page.

## 安装 / Install

1. 确保你已安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
2. [点击安装](https://github.com/FFFold/x-copy-link/raw/main/x-copy-link.user.js)

## 使用 / Usage

安装后在 X.com 任意帖子下方操作栏中会多出一个 🔗 链接图标，点击即可复制该帖子的完整 URL 到剪贴板。

## 特性 / Features

- 支持 X.com 和 Twitter.com
- 首页推荐流、搜索结果、用户主页均可使用
- 复制成功后有 Toast 提示
- 轻量，仅 140+ 行
- 自动适应动态加载（MutationObserver）

## 兼容性 / Compatibility

| 浏览器 / 扩展 | 状态 |
|--------------|------|
| Chrome + Tampermonkey | ✅ |
| Firefox + Tampermonkey | ✅ |
| Edge + Tampermonkey | ✅ |
| Chrome + Violentmonkey | ✅ |
| Safari + Userscripts | ⚠️ 未测试 |

## License

MIT
