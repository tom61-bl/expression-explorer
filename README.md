# 表达力探索 · Expression Explorer

> 把"说不清楚"拆成可以练的动作：10 课表达结构、8 维结构自查、听众视角、30 秒微练习，外加一页速查和经典框架库。流程图按内容换成 6 种布局，不再是千篇一律的四框。

[在线体验](https://tom61-bl.github.io/expression-explorer/) ·
[问题反馈](https://github.com/tom61-bl/expression-explorer/issues)

![License](https://img.shields.io/badge/license-MIT-blue)
![single-file](https://img.shields.io/badge/single--file-83_KB-brightgreen)
![no-dependencies](https://img.shields.io/badge/dependencies-0-lightgrey)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-success)

## 这是什么

一个纯前端单页应用。没有后端、没有构建步骤、不联网，双击 `index.html` 就能跑。

两个模式：

**学习模式** —— 十课，每课都有一条可播放的表达流程，节点之间有连接线随播放逐段点亮。流程图按内容选择布局：结论先行用汇聚、MECE 用金字塔、信息增量用漏斗、汇报和难谈用分支、倾听幽默用循环，普通说法统一走线性。左右切换「普通说法 / 更好说法」，同一件事两种讲法并排站着，差在哪一眼能看见。每一步都配一条第二人称的内心独白，告诉你此刻对方脑子里在想什么。每课还附「这样会翻车」边界和一个 30 秒微练习，练习通过才标记完成。侧栏另有三个专题：一页速查、经典框架库、反模式速查。

**训练模式** —— 三个入口：题库 12 题（业务汇报 / 日常聊天 / 学生会汇报 / 职场申请 / 面试演讲）、我的表达（自由输入）、听众视角（3 场景 × 5 听众切换）。提交后不再给伪精确分数，而是做 8 维「通过 / 待改进」结构自查，每项标注经典来源、给出原因和可执行建议，附逐句对照和金字塔参考版本。

## 十课

| 组 | 课程 | 核心 |
|---|---|---|
| 结构 | 结论先行 | 开口先给答案，再给三个支撑点 |
| 结构 | 金字塔与 MECE | 塔尖一句话，同层互斥、完全穷尽 |
| 结构 | SCQA 与 PREP | 情境—冲突—问题—答案，观点—理由—例子—观点 |
| 增量与语气 | 信息增量 | 删掉正确废话，每句都递新信息 |
| 增量与语气 | 具体化 | 从抽象下梯子到数字和可感知的细节 |
| 增量与语气 | 确定感 | 去口头禅、动词优先、给确定判断 |
| 场景 | 汇报与布置 | 坏消息带两个方案，布置讲清五要素 |
| 场景 | 面试与演讲 | STAR 讲案例，开场给听众一个承诺 |
| 场景 | 难谈对话 | SBI / OFNR，对事不对人 |
| 场景 | 倾听提问与幽默 | 先回应情绪，再回应内容 |

## 8 维结构自查

| 维度 | 经典来源 | 检查什么 |
|---|---|---|
| 结论先行 | 金字塔原理 | 第一句是否直接给判断 |
| 论点独立（MECE） | 金字塔原理 | 各论点是否重叠、有没有硬凑 |
| 顺序组织 | SCQA / 金字塔 | 有没有编号或顺序词 |
| 行动指向 | PREP / 行动号召 | 结尾有没有明确下一步 |
| 论据支撑 | Logos / 数据论证 | 有没有数字、对比、案例 |
| 具体程度 | SUCCESs | 有没有换掉模糊词 |
| 简洁度 | 信息增量 | 有没有口头禅和冗余 |
| 听众立场 | Ethos / 听众视角 | 有没有讲对对方的意义 |

结构自查只看骨架，不做写作评价，也不打总分。

## 三个专题

- **一页速查**：19 个常见场景，每个场景对应一个工具和一句话口诀。
- **经典框架库**：6 个主题 tab —— 修辞三要素（Ethos/Pathos/Logos）、信息增量四来源、说服七原则、倾听四层次、幽默技巧与分寸、开口前 10 秒自检（可勾选，五问全过才放行）。
- **反模式速查**：12 个常见翻车点，每个附为什么坏、怎么改。

## 本地运行

```bash
git clone https://github.com/tom61-bl/expression-explorer.git
cd expression-explorer
```

然后直接双击 `index.html`（Windows 也可以 `start index.html`，macOS 用 `open index.html`）。

也可以用任意静态服务器：

```bash
python -m http.server 8000
```

浏览器打开 `http://localhost:8000`。

## 部署

GitHub Pages，`main` 分支根目录直接发布，无需构建。改完 `index.html` push 上去，一两分钟内生效。

`.nojekyll` 已就位，避免 Jekyll 处理非标准目录。

## 目录结构

```
expression-explorer/
├── index.html      # 全部代码：样式 + 十课数据 + 案例 + 题库 + 检查引擎 + 框架库
├── smoke-test.js   # Node 冒烟测试（无需浏览器）
├── README.md
├── LICENSE
└── .nojekyll
```

## 技术说明

- 单文件，HTML + CSS + 原生 JS，零依赖、零构建
- 数据全部内联在 `index.html` 的 `LESSONS` / `CASES` / `BANK` / `CHEAT_SHEET` / `FRAMEWORKS` 等常量里，加内容改对应常量即可
- `localStorage` 保存阅读进度、练习完成状态、界面主题、当前框架 tab
- 支持深色模式；窄屏下侧栏改为汉堡按钮 + 滑入抽屉，流程图退化为纵向列表并隐藏连线，780px 与 480px 两个断点，触摸目标不小于 44px
- 标题用衬线、正文无衬线，冷宣纸白 + 深墨绿配色，带轻微纸张噪点；图标全部内联 SVG，不使用 emoji
- 兼容现代浏览器（用到 `color-mix()`）
- 无浏览器冒烟测试：`node smoke-test.js index.html`，覆盖检查规则、块渲染、数据完整性和布局几何

## 许可

[MIT](LICENSE)
