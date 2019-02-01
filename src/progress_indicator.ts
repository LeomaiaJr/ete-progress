interface ProgressIndicatorOptions {
	length?: number
	filledChar?: string
	emptyChar?: string
}

export default function CreateProgressIndicator(percent: number, options: ProgressIndicatorOptions): string {
	const length = options.length || 10
	const filledChar = options.filledChar || '█'
	const emptyChar = options.emptyChar || '░'
	const filledLength = Math.floor(percent * length)

	return filledChar.repeat(filledLength) + emptyChar.repeat(length - filledLength)
}