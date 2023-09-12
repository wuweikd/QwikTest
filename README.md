# Qwit 与 NextJs13（RSC） 对比

Qwik与NextJs-v13是替代传统SSR的优秀框架，本文通过实际搭建两个相同功能的页面。直接对比两个框架的实际表现。

测试页面
Qwik：https://qwik-test-wuwei.vercel.app/
Nextjs: https://nextjs-demo-ten-blush.vercel.app/


## Qwik 的优势

```html
Qwik 是一个基于 Web Components 的快速轻量级前端框架，它在性能方面表现出色。虽然我没有直接的数据来证明 Qwik 与其他框架的性能比较，但以下是一些关于 Qwik 的性能特点：

快速启动时间：Qwik 的启动时间非常短，因为它只需要加载必要的组件和数据，而不需要加载整个应用程序。这使得用户可以快速地看到初始内容，并且能够立即与应用程序进行交互。

高度优化的渲染：Qwik 使用服务器端渲染（SSR）和预渲染技术，可以在服务器上生成静态 HTML，然后将其发送到客户端。这样可以提供更快的首次渲染，同时也有利于搜索引擎优化（SEO）。

增量渲染：Qwik 采用了增量渲染的方式，只渲染需要更新的部分，而不是整个页面。这样可以最大限度地减少不必要的渲染和网络传输，提高页面的渲染效率。

轻量级的框架：Qwik 是一个轻量级的框架，它的核心库非常小巧，只包含了必要的功能。这使得它能够快速加载和执行，减少了不必要的性能开销。
```

## NextJs-v13 的优势
```html
自动模块预取（Automatic Module Prefetching）：Next.js v13 引入了自动模块预取的功能，通过分析页面之间的导航关系，预取相关的 JavaScript 模块，以提前加载可能需要的代码。这有助于减少页面之间的延迟，并提高整体的加载速度和性能。

静态优化（Static Optimization）改进：Next.js v13 进一步改进了静态优化的功能。静态优化允许将页面预先生成为静态 HTML，从而加快页面的加载速度。v13 版本对静态优化的算法做出了改进，提供了更好的性能和更高的渲染速度。

预渲染性能优化：Next.js v13 引入了更强大的预渲染性能优化功能。它提供了更灵活的预渲染配置选项，包括基于路由参数的动态预渲染和更细粒度的缓存控制。这使得开发者可以更好地控制和优化页面的渲染性能。

缓存优化：Next.js v13 增加了对缓存的更好支持。它引入了一种新的缓存策略，可根据内容的哈希值进行缓存控制。这意味着只有在内容发生变化时，才会重新生成和缓存页面，从而减少了不必要的重复渲染和缓存。

改进的开发者体验：Next.js v13 通过改进开发者工具和调试功能，提供了更好的开发者体验。这包括更快的开发模式启动时间、更准确的错误报告和更简化的配置选项，使开发流程更高效和愉快
```

## 运行性能
由于nextJs13 是基于React18,运行性能与React一致。Qwik的重心为启动性能，运行性能未知。具体可以查看以下链接。
[框架性能对比](https://github.com/krausest/js-framework-benchmark#snapshot-of-the-results)、[Qwik运行性能](https://github.com/krausest/js-framework-benchmark/issues/1111)

## 资源加载

### css加载
1. Qwik 默认将Css和Html打包一起，作为内联样式。
2. next 默认将 css作为外联样式。

### JS加载
> 首屏为静态页面，次屏包含大量第三方SDK的动态页面
1. Qwik首屏请求JS资源：77KB，次屏：1.3M
2. next首屏请求js资源：96KB，次屏：1.5M
3. 对于动态功能，Qwik交互需要额外加载资源以支持事件逻辑（增量渲染逻辑）。

### 首屏性能指标(保留缓存)
> 首屏为client component
1. Qwik:   "fmp":357,"fp":343,"fcp":342.8,"lcp":297.6,"cls":0,"fid":0,"ttfb":30.2
2. nextjs: "fmp":388,"fp":389,"fcp":389.3,"lcp":342.1,"cls":0,"fid":0,"ttfb":70.9


### 次屏性能指标(保留缓存，直接刷新页面测试)
> 次屏包含大量第三方SDK的server component
1. Qwik:   "fmp":370,"fp":316,"fcp":316.3,"lcp":316.3,"cls":0,"fid":0,"ttfb":40.8,
2. nextjs: "fmp":416,"fp":329,"fcp":328.6,"lcp":328.6,"cls":0,"fid":0,"ttfb":59.3,

### 次屏性能指标(低速3G，无缓存)
> 次屏包含大量第三方SDK的server component。
1. Qwik（含service worker）:  "fmp":2366,"fp":2323,"fcp":2323.2,"lcp":2323.2,"cls":0,"fid":0,"ttfb":33.8
2. Qwik（无service worker）:  "fmp":13795,"fp":2347,"fcp":2347.1,"lcp":2347.1,"cls":0,"fid":0,"ttfb":53.6
3. nextjs:                   "fmp":17340,"fp":4379,"fcp":4379.3,"lcp":4379.3,"cls":0,"fid":0,"ttfb":104.6


### 浏览器标签内存占用（Chrome）
1. Qwik:    109M（后台），163M（峰值）
2. nextjs:  100M（后台），167M（峰值）

### 交互响应速度
1. Qwik: 利用[预请求](https://qwik.builder.io/docs/advanced/speculative-module-fetching/#pre-populating-the-cache-per-page)，能覆盖多数需及时响应的场景。
2. nextjs: 及时响应。

## 总结
1. Qwik 首屏下载资源更少，页面响应更快（需要service worker）。
2. NextJS 会提前将全部资源下载，但是社区更好

|      | 性能指标 | 交互及时性  | 弱网体验 | 内存占用 |  上手容易度（社区） | 总分  |
|------|-------|-------|--------------|------|-----------|-----|
| Qwik | 9分    | 9分     | 5分   | 5分   | 5分        | 33分 |
| NextJs | 7分    | 9分  | 3分   | 5分   | 7分        | 31分 |
