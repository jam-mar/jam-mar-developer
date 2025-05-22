import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import type { TranslationData, Skills } from '@/types/translations'

describe('Translation File Validation', () => {
  let englishData: TranslationData
  let norwegianData: TranslationData

  beforeAll(() => {
    const englishPath = path.join(process.cwd(), 'messages', 'en.json')
    const englishContent = fs.readFileSync(englishPath, 'utf8')
    englishData = JSON.parse(englishContent) as TranslationData
    const norwegianPath = path.join(process.cwd(), 'messages', 'nb.json')
    const norwegianContent = fs.readFileSync(norwegianPath, 'utf8')
    norwegianData = JSON.parse(norwegianContent) as TranslationData
  })

  describe('File Content Validation', () => {
    it('should have valid JSON syntax in both files', () => {
      expect(() => JSON.stringify(englishData)).not.toThrow()
      expect(() => JSON.stringify(norwegianData)).not.toThrow()
    })
    it('should load English file (en.json) successfully', () => {
      expect(englishData).toBeDefined()
      expect(typeof englishData).toBe('object')
    })
    it('should load Norwegian file (nb.json) successfully', () => {
      expect(norwegianData).toBeDefined()
      expect(typeof norwegianData).toBe('object')
    })
    it('should have identical top-level keys', () => {
      const englishKeys = Object.keys(englishData).sort()
      const norwegianKeys = Object.keys(norwegianData).sort()
      expect(norwegianKeys).toEqual(englishKeys)
    })
  })

  it('should preserve array structures and lengths', () => {
    const checkArrayStructures = <T extends Record<string, unknown>>(
      engObj: T,
      norObj: T,
      path = '',
    ) => {
      for (const key in engObj) {
        if (!Object.prototype.hasOwnProperty.call(engObj, key)) continue

        const currentPath = path ? `${path}.${key}` : key
        const engValue = engObj[key]
        const norValue = norObj[key]

        if (Array.isArray(engValue)) {
          expect(Array.isArray(norValue), `${currentPath} should be an array`).toBe(true)
          expect((norValue as unknown[])?.length, `${currentPath} should have same length`).toBe(
            engValue.length,
          )

          if (engValue.length > 0 && typeof engValue[0] === 'object' && engValue[0] !== null) {
            engValue.forEach((item, index) => {
              if (typeof item === 'object' && item !== null) {
                const engItemKeys = Object.keys(item as Record<string, unknown>).sort()
                const norItem = (norValue as unknown[])[index]
                const norItemKeys = Object.keys((norItem as Record<string, unknown>) || {}).sort()
                expect(norItemKeys, `${currentPath}[${index}] should have matching keys`).toEqual(
                  engItemKeys,
                )
              }
            })
          }
        } else if (typeof engValue === 'object' && engValue !== null) {
          expect(typeof norValue, `${currentPath} should be an object`).toBe('object')
          expect(norValue, `${currentPath} should not be null`).not.toBeNull()
          checkArrayStructures(
            engValue as Record<string, unknown>,
            norValue as Record<string, unknown>,
            currentPath,
          )
        }
      }
    }

    checkArrayStructures(englishData, norwegianData)
  })

  describe('Content Translation Validation', () => {
    // Type guard to check if a value is a string
    const isString = (value: unknown): value is string => typeof value === 'string'

    // Type guard to check if a value is an object (and not null or an array)
    const isPlainObject = (value: unknown): value is Record<string, unknown> =>
      typeof value === 'object' && value !== null && !Array.isArray(value)

    const countStrings = <T extends Record<string, unknown>>(obj: T): number => {
      let count = 0

      if (obj === null || obj === undefined) return count

      for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue

        const value = obj[key]

        if (isString(value) && value.length > 0) {
          count++
        } else if (isPlainObject(value)) {
          count += countStrings(value)
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            if (isString(item) && item.length > 0) {
              count++
            } else if (isPlainObject(item)) {
              count += countStrings(item)
            }
          })
        }
      }
      return count
    }

    it('should have translated text content (not identical for translatable strings)', () => {
      expect(norwegianData.hero.heading).not.toBe(englishData.hero.heading)
      expect(norwegianData.aboutMe.heading).not.toBe(englishData.aboutMe.heading)
      expect(norwegianData.contact.heading).not.toBe(englishData.contact.heading)
      expect(norwegianData.work.heading).not.toBe(englishData.work.heading)
      expect(norwegianData.projects.heading).not.toBe(englishData.projects.heading)
    })

    it('should preserve non-translatable content', () => {
      expect(norwegianData.hero.email).toBe(englishData.hero.email)
      expect(norwegianData.contact.email).toBe(englishData.contact.email)
      expect(norwegianData.contact.phoneNumber).toBe(englishData.contact.phoneNumber)
      expect(norwegianData.contact.mailto).toBe(englishData.contact.mailto)
      expect(norwegianData.contact.phoneLink).toBe(englishData.contact.phoneLink)
    })

    it('should have same number of translatable strings', () => {
      const englishStringCount = countStrings(englishData)
      const norwegianStringCount = countStrings(norwegianData)

      expect(norwegianStringCount).toBe(englishStringCount)
      expect(norwegianStringCount).toBeGreaterThan(50)
    })
  })

  describe('Data Type Consistency', () => {
    const checkDataTypes = <T extends Record<string, unknown>>(engObj: T, norObj: T, path = '') => {
      if (engObj === null || engObj === undefined || norObj === null || norObj === undefined) {
        return
      }

      for (const key in engObj) {
        if (!Object.prototype.hasOwnProperty.call(engObj, key)) continue

        const currentPath = path ? `${path}.${key}` : key
        const engValue = engObj[key]
        const norValue = norObj[key]

        const engType = typeof engValue
        const norType = typeof norValue

        expect(
          norType,
          `${currentPath} should have same type as English version (${engType})`,
        ).toBe(engType)

        if (engType === 'object' && engValue !== null) {
          if (Array.isArray(engValue)) {
            expect(Array.isArray(norValue), `${currentPath} should be an array`).toBe(true)
            // If both are arrays, we should recursively check their elements if they are objects
            if (engValue.length > 0 && typeof engValue[0] === 'object' && engValue[0] !== null) {
              engValue.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                  // Cast to Record<string, unknown> for recursive call on array items
                  checkDataTypes(
                    item as Record<string, unknown>,
                    (norValue as unknown[])[index] as Record<string, unknown>,
                    `${currentPath}[${index}]`,
                  )
                }
              })
            }
          } else {
            // Recursively check plain objects
            checkDataTypes(
              engValue as Record<string, unknown>,
              norValue as Record<string, unknown>,
              currentPath,
            )
          }
        }
      }
    }

    it('should maintain consistent data types throughout', () => {
      checkDataTypes(englishData, norwegianData)
    })
  })

  describe('Specific Section Validation', () => {
    it('should have translated tech skills with same structure', () => {
      const engSkillCategories = Object.keys(englishData.tech.skills) as Array<keyof Skills>
      const norSkillCategories = Object.keys(norwegianData.tech.skills) as Array<keyof Skills>

      expect(norSkillCategories.sort()).toEqual(engSkillCategories.sort())

      engSkillCategories.forEach((category) => {
        const engItems = englishData.tech.skills[category].items
        const norItems = norwegianData.tech.skills[category].items

        expect(norItems.length, `${String(category)} should have same number of items`).toBe(
          engItems.length,
        )
      })
    })

    it('should have complete project translations', () => {
      expect(Array.isArray(norwegianData.projects.projects)).toBe(true)
      expect(norwegianData.projects.projects.length).toBe(englishData.projects.projects.length)

      englishData.projects.projects.forEach((engProject, index) => {
        const norProject = norwegianData.projects.projects[index]

        // Check that key project fields exist and are translated
        expect(norProject.title).toBeDefined()
        expect(norProject.description).toBeDefined()

        // URLs and technical data should remain the same
        if (engProject.liveUrl) {
          expect(norProject.liveUrl).toBe(engProject.liveUrl)
        }
      })
    })
  })
})
