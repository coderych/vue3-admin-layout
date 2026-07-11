import { describe, expect, it } from 'vitest'
import {
  applySkinStyles,
  applyThemeStyles,
  calculateInverted,
  getLabel,
  getParentsKeys,
  parseColor,
} from '../AdminLayout/src/helper'
import { AdminLayoutCssVars } from '../AdminLayout/src/typing'

// ─── parseColor ───────────────────────────────────────────────────────────────

describe('parseColor', () => {
  it('parses #RGB shorthand', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255])
    expect(parseColor('#000')).toEqual([0, 0, 0])
    expect(parseColor('#f00')).toEqual([255, 0, 0])
  })

  it('parses #RGBA shorthand', () => {
    expect(parseColor('#fff0')).toEqual([255, 255, 255])
    expect(parseColor('#000f')).toEqual([0, 0, 0])
  })

  it('parses #RRGGBB', () => {
    expect(parseColor('#ff0000')).toEqual([255, 0, 0])
    expect(parseColor('#00ff00')).toEqual([0, 255, 0])
    expect(parseColor('#0000ff')).toEqual([0, 0, 255])
    expect(parseColor('#1a2b3c')).toEqual([26, 43, 60])
  })

  it('parses #RRGGBBAA', () => {
    expect(parseColor('#ff000080')).toEqual([255, 0, 0])
    expect(parseColor('#000000ff')).toEqual([0, 0, 0])
  })

  it('parses rgb()', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual([255, 0, 0])
    expect(parseColor('rgb(0, 128, 255)')).toEqual([0, 128, 255])
  })

  it('parses rgba()', () => {
    expect(parseColor('rgba(255, 255, 255, 0.5)')).toEqual([255, 255, 255])
    expect(parseColor('rgba(0, 0, 0, 1)')).toEqual([0, 0, 0])
  })

  it('handles case-insensitive hex', () => {
    expect(parseColor('#ABC')).toEqual([170, 187, 204])
    expect(parseColor('#abc')).toEqual([170, 187, 204])
  })

  it('throws on unsupported format', () => {
    expect(() => parseColor('red')).toThrow('Unsupported color format')
    expect(() => parseColor('hsl(0, 100%, 50%)')).toThrow('Unsupported color format')
  })
})

// ─── calculateInverted ────────────────────────────────────────────────────────

describe('calculateInverted', () => {
  it('returns false for empty string', () => {
    expect(calculateInverted('')).toBe(false)
  })

  it('returns false for transparent', () => {
    expect(calculateInverted('transparent')).toBe(false)
  })

  it('returns true for dark colors (light text needed)', () => {
    expect(calculateInverted('#000000')).toBe(true)
    expect(calculateInverted('#333333')).toBe(true)
    expect(calculateInverted('rgb(0, 0, 0)')).toBe(true)
  })

  it('returns false for light colors (dark text needed)', () => {
    expect(calculateInverted('#ffffff')).toBe(false)
    expect(calculateInverted('#eeeeee')).toBe(false)
    expect(calculateInverted('rgb(255, 255, 255)')).toBe(false)
  })

  it('returns false for invalid color (catch block)', () => {
    expect(calculateInverted('not-a-color')).toBe(false)
  })
})

// ─── getParentsKeys ───────────────────────────────────────────────────────────

describe('getParentsKeys', () => {
  it('handles empty tree', () => {
    const result = getParentsKeys([])
    expect(result.size).toBe(0)
  })

  it('handles flat tree (no children)', () => {
    const tree = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const result = getParentsKeys(tree)
    expect(result.get('a')).toEqual(['a'])
    expect(result.get('b')).toEqual(['b'])
    expect(result.get('c')).toEqual(['c'])
  })

  it('handles nested tree with default options', () => {
    const tree = [
      {
        id: 'p1',
        children: [
          { id: 'c1' },
          { id: 'c2', children: [{ id: 'g1' }] },
        ],
      },
    ]
    const result = getParentsKeys(tree)
    expect(result.get('p1')).toEqual(['p1'])
    expect(result.get('c1')).toEqual(['p1'])
    expect(result.get('c2')).toEqual(['p1'])
    expect(result.get('g1')).toEqual(['p1', 'c2'])
  })

  it('handles custom id/children keys', () => {
    const tree = [
      {
        key: 'p1',
        items: [
          { key: 'c1' },
        ],
      },
    ]
    const result = getParentsKeys(tree, { id: 'key', children: 'items' })
    expect(result.get('p1')).toEqual(['p1'])
    expect(result.get('c1')).toEqual(['p1'])
  })

  it('handles multiple root nodes', () => {
    const tree = [
      { id: 'r1', children: [{ id: 'c1' }] },
      { id: 'r2', children: [{ id: 'c2' }] },
    ]
    const result = getParentsKeys(tree)
    expect(result.get('r1')).toEqual(['r1'])
    expect(result.get('c1')).toEqual(['r1'])
    expect(result.get('r2')).toEqual(['r2'])
    expect(result.get('c2')).toEqual(['r2'])
  })
})

// ─── getLabel ─────────────────────────────────────────────────────────────────

describe('getLabel', () => {
  it('returns string label as-is', () => {
    expect(getLabel('Dashboard', {} as any)).toBe('Dashboard')
  })

  it('returns empty string for undefined', () => {
    expect(getLabel(undefined, {} as any)).toBe('')
  })

  it('calls function label with option', () => {
    const option = { key: '1', label: 'test' }
    const labelFn = (opt: any) => `Menu: ${opt.key}`
    expect(getLabel(labelFn, option)).toBe('Menu: 1')
  })
})

// ─── applyThemeStyles ─────────────────────────────────────────────────────────

describe('applyThemeStyles', () => {
  it('does nothing when color is empty', () => {
    const style: Record<string, any> = {}
    applyThemeStyles(style as any, '', false)
    expect(Object.keys(style)).toHaveLength(0)
  })

  it('sets CSS vars for normal (light) theme', () => {
    const style: Record<string, any> = {}
    applyThemeStyles(style as any, '#fff', false)
    expect(style[AdminLayoutCssVars.BaseColor]).toBe('#fff')
    expect(style[AdminLayoutCssVars.TextColor]).toBe('var(--text-color-light)')
    expect(style[AdminLayoutCssVars.BorderColor]).toBe('var(--border-color-light)')
    expect(style[AdminLayoutCssVars.ScrollbarColor]).toBe('var(--scrollbar-color-light)')
    expect(style[AdminLayoutCssVars.ScrollbarColorHover]).toBe('var(--scrollbar-color-hover-light)')
  })

  it('sets CSS vars for inverted (dark) theme', () => {
    const style: Record<string, any> = {}
    applyThemeStyles(style as any, '#000', true)
    expect(style[AdminLayoutCssVars.BaseColor]).toBe('#000')
    expect(style[AdminLayoutCssVars.TextColor]).toBe('var(--text-color-dark)')
    expect(style[AdminLayoutCssVars.BorderColor]).toBe('var(--border-color-dark)')
  })
})

// ─── applySkinStyles ──────────────────────────────────────────────────────────

describe('applySkinStyles', () => {
  it('applies glassmorphism styles', () => {
    const style: Record<string, any> = {}
    applySkinStyles(style as any)
    expect(style.backgroundColor).toBe('#fff9')
    expect(style.backdropFilter).toBe('blur(8px)')
    expect(style.WebkitBackdropFilter).toBe('blur(8px)')
    expect(style[AdminLayoutCssVars.BaseColor]).toBe('#fff9')
  })
})
