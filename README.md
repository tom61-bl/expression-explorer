# 表达力探索 · Expression Explorer

> 把"说不清楚"拆成可以练的动作：10 课表达结构、逐句对照的高管 vs 应届生案例、四维评分训练工坊。

[在线体验](https://tom61-bl.github.io/expression-explorer/) ·
[问题反馈](https://github.com/tom61-bl/expression-explorer/issues)

![License](https://img.shields.io/badge/license-MIT-blue)
![single-file](https://img.shields.io/badge/single--file-53_KB-brightgreen)
![no-dependencies](https://img.shields.io/badge/dependencies-0-lightgrey)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-success)

## 这是什么

一个纯前端单页应用。没有后端、没有构建步骤、不联网，双击 `index.html` 就能跑。

两个模式：

**学习模式** —— 十课，每课都有一条可播放的表达流程。左右切换「普通说法 / 更好说法」，同一件事两种讲法并排站着，差在哪一眼能看见。每一步都配一条状态观察，告诉你此刻对方脑子里发生了什么。底部是案例区：同一情境下应届生怎么讲、高管怎么讲，差在顺序还是差在词，直接摊开。

**训练模式** —— 题库 12 题（业务汇报 / 日常聊天 / 学生会汇报 / 职场申请 / 面试演讲），给一段粗糙的原始信息，你重组后提交，系统按四个维度打分，并给出可执行的改写建议、逐句对照，以及一份金字塔结构的完美版本。

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

## 评分维度

| 维度 | 权重 | 判据 |
|---|---|---|
| 结论先行 | 30% | 第一句是否直接给出判断，是否超过 80 字 |
| 论据充分性 | 30% | 是否出现百分比、数量、对比、案例等硬支撑 |
| 论点独立性 | 25% | 各论点关键词重合度是否超过阈值（MECE 检查） |
| 逻辑顺序 | 15% | 是否有编号或顺序词组织论点 |

分数只看结构，不看辞藻。90 分以上金牌，75 分银牌，60 分铜牌。

## 本地运行

```bash
git clone https://github.com/tom61-bl/expression-explorer.git
cd expression-explorer
# 直接打开
start index.html      # Windows
open index.html       # macOS
```

也可以用任意静态服务器：

```bash
python -m http.server 8000
```

## 部署

GitHub Pages，`main` 分支根目录直接发布，无需构建。改完 `index.html` push 上去，一两分钟内生效。

`.nojekyll` 已就位，避免 Jekyll 处理非标准目录。

## 目录结构

```
expression-explorer/
├── index.html      # 全部代码：样式 + 十课数据 + 案例 + 题库 + 评分引擎
├── README.md
├── LICENSE
└── .nojekyll
```

## 技术说明

- 单文件，HTML + CSS + 原生 JS，零依赖、零构建
- 数据全部内联在 `index.html` 的 `LESSONS` / `CASES` / `BANK` 三个常量里，加课加题改这三处即可
- `localStorage` 保存阅读进度、已完成课程、界面主题
- 支持深色模式；窄屏下侧栏折叠，画布改为两列
- 兼容现代浏览器（用到 `color-mix()`）

## 许可

[MIT](LICENSE)
