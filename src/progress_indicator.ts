interface ProgressIndicatorOptions {
  length?: number
  filledChar?: string
  emptyChar?: string
}

export default function createProgressIndicator(percent: number, options: ProgressIndicatorOptions = {}): string {
  const length = options.length || 16
  const filledChar = options.filledChar || '█'
  const emptyChar = options.emptyChar || '░'
  const filledLength = Math.floor(percent * length)

  return filledChar.repeat(filledLength) + emptyChar.repeat(length - filledLength)
}
