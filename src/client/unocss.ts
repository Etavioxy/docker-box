import type { Rule, UserShortcuts } from 'unocss'

export const rules: Rule[] = [
  ['img-f', { 'width': '100%', 'object-fit': 'contain' }],
  ['w-f', { width: '100%' }],
]

export const shortcuts: UserShortcuts = [
  {
    'input-shortcut': 'h-2em w-3/5 m-1.5em'
  },
  [  // flex
    /^flex-((c|s|e)(-(c|s|e|b|a))*)$/,
    ([, , align, , justify]) => {
      const matches = [
        { prefix: 'c', value: 'center' },
        { prefix: 's', value: 'start' },
        { prefix: 'e', value: 'end' },
        { prefix: 'b', value: 'between' },
        { prefix: 'a', value: 'around' },
      ]
      let style = ''
      let corr = matches.find(ele => ele.prefix === align)
      style += `flex items-${corr?.value} content-${corr?.value}`
      if (justify) {
        corr = matches.find(ele => ele.prefix === justify)
        style += ` justify-${corr?.value}`
      }
      return style
    },
  ],
]
