import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names with Tailwind CSS classes
 * and handles merging conflicting classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
