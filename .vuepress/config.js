module.exports = {
  title: '全栈进阶之路',
  description: 'web全栈工程师进阶之路',
  themeConfig: {
    repo: 'fuyi501/web-fullStack',
    editLinks: true,
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: '读书笔记',
        items: [
          { text: '前端工具', link: '/00-前端工具/' },
          { text: 'HTML 基础', link: '/01-HTML 基础/' }
        ]
      },
      {
        text: '配置',
        link: '/config/'
      },
      {
        text: '默认主题',
        link: '/default-theme-config/'
      }
    ],
    // sidebar: {
    //   '/00-前端工具/': genSidebarConfig('前端工具')
    // },
    sidebar: 'auto'
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '01-Git的使用',
        '02-VS Code的使用'
      ]
    }
  ]
}
