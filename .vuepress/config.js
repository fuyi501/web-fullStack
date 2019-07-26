module.exports = {
  title: '全栈进阶之路',
  description: 'web?全栈工程师进阶之路',
  themeConfig: {
    repo: 'fuyi501/web-fullStack',
    // editLinks: true,
    // editLinkText: '编辑代码',
    sidebarDepth: 2,
    nav: [
      {
        text: '主页',
        link: '/',
      },
      {
        text: '前端必备',
        items: [
          { text: '前端工具', link: '/00-前端工具/' },
          { text: 'HTML 基础', link: '/01-HTML 基础/' }
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'MySQL', link: '/09-MySQL/' },
          { text: 'MongoDB', link: '/10-MongoDB/' },
          { text: 'Redis', link: '/11-Redis/' }
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Node.js', link: '/07-Node.js/' },
          { text: 'Nginx', link: '/12-Nginx/' }
        ]
      }
    ],
    sidebar: {
      '/about/': genSidebarConfig(''),
      '/00-前端工具/': genSidebarConfig('前端工具'),
      '/01-HTML 基础/': genSidebarConfig('HTML 基础'),
    },
  }
}

function genSidebarConfig (title) {
  if (title === '前端工具') {
    return [
      {
        title,
        collapsable: false,
        children: [
          '',
          '01-Git的使用',
          '02-VS Code的使用'
        ]
      }
    ]
  } else if (title === 'HTML 基础') {
    return [
      {
        title,
        collapsable: false,
        children: [
          '',
          '01-HTML 基础知识简介汇总'
        ]
      }
    ]
  } else if (title === '') {
    return [
      {
        title,
        collapsable: false,
        children: [
          '',
          '前端知识体系'
        ]
      }
    ]
  }
}
