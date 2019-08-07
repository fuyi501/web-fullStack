module.exports = {
  title: '全栈进阶之路',
  description: 'web?全栈工程师进阶之路',
  themeConfig: {
    repo: 'fuyi501/web-fullStack',
    // lastUpdated: '最近更新', // string | boolean
    // editLinks: true,
    // editLinkText: '编辑代码',
    sidebarDepth: 2,
    nav: [
      {
        text: '主页',
        link: '/',
      },
      {
        text: '快速开始',
        link: '/about/',
      },
      {
        text: '全栈必备',
        items: [
          {
            text: '前端工具',
            link: '/00-前端工具/'
          },
          {
            text: 'HTML 基础',
            link: '/01-HTML 基础/'
          },
          {
            text: 'CSS 基础',
            link: '/02-CSS 基础/'
          },
          {
            text: 'JavaScript 基础',
            link: '/04-JavaScript 基础/'
          },
          {
            text: 'JavaScript 进阶',
            link: '/05-JavaScript 进阶/'
          },
          {
            text: '数据结构与算法',
            link: '/14-数据结构与算法/'
          },
          {
            text: '数据库',
            items: [{
                text: 'MySQL',
                link: '/09-MySQL/'
              },
              {
                text: 'MongoDB',
                link: '/10-MongoDB/'
              },
              {
                text: 'Redis',
                link: '/11-Redis/'
              }
            ]
          },
          {
            text: '后端',
            items: [
              {
                text: 'Node.js',
                link: '/07-Node.js/'
              },
              {
                text: 'Nginx',
                link: '/12-Nginx/'
              }
            ]
          }
        ]
      },
      // {
      //   text: '面试',
      //   link: '/15-面试/',
      // },
      {
        text: 'LeetCode',
        link: '/18-LeetCode/',
      },
      {
        text: '收藏',
        link: '/16-收藏/',
      }
    ],
    sidebar: {
      '/about/': genSidebarConfig(''),
      '/00-前端工具/': genSidebarConfig('前端工具'),
      '/01-HTML 基础/': genSidebarConfig('HTML 基础'),
      '/02-CSS 基础/': genSidebarConfig('CSS 基础'),
      '/04-JavaScript 基础/': genSidebarConfig('JavaScript 基础'),
      '/05-JavaScript 进阶/': genSidebarConfig('JavaScript 进阶'),
      '/09-MySQL/': genSidebarConfig('MySQL'),
      '/14-数据结构与算法/': genSidebarConfig('数据结构与算法'),
    },
  }
}

function genSidebarConfig(title) {
  console.log(title)
  if (title === '前端工具') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-Git的使用',
        '02-VS Code的使用'
      ]
    }]
  } else if (title === 'HTML 基础') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-HTML 基础知识简介汇总'
      ]
    }]
  } else if (title === 'CSS 基础') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-CSS基础知识汇总'
      ]
    }]
  } else if (title === 'JavaScript 基础') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '02-数据类型&类型转换&运算符',
        '14-BOM浏览器对象模型',
      ]
    }]
  } else if (title === 'JavaScript 进阶') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-原型与原型链',
        '02-执行上下文与执行上下文栈',
      ]
    }]
  } else if (title === '数据结构与算法') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-JS数据结构之数组',
        '02-JS数据结构之栈',
        '03-JS数据结构之队列',
      ]
    }]
  } else if (title === 'MySQL') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '01-MySQL基本操作',
        '02-数据过滤',
        '03-用正则表达式进行搜索',
        '04-计算字段与数据处理函数',
      ]
    }]
  } else if (title === '') {
    return [{
      title,
      collapsable: false,
      children: [
        '',
        '前端知识体系'
      ]
    }]
  }
}