import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BUBBLES as hungarian } from './data.js'
import { BUBBLES as english } from './data.en.js'

test('English bubbles match the Hungarian map structure', () => {
  assert.equal(english.length, hungarian.length)
  for (const [index, bubble] of hungarian.entries()) {
    const translation = english[index]
    assert.equal(translation.type, bubble.type)
    assert.ok(translation.title)
    assert.ok(translation.tooltip)
    assert.equal(translation.options?.length ?? 0, bubble.options?.length ?? 0)
    if (translation.options) {
      assert.ok(translation.options.every(Boolean))
      assert.equal(new Set(translation.options).size, translation.options.length)
    }
  }
})
