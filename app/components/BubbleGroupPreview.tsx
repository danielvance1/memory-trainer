import MappingBubble from "./MappingBubble"
import { BubbleState } from "../types"
import { memo, useState } from "react"

export type BubbleGroupPreviewProps = {
    first: number,
    bubbleCount: number,
    significantDigits: number
    bubbleStates: boolean[]
}

function BubbleGroupPreview({ first, bubbleCount, significantDigits, bubbleStates }: BubbleGroupPreviewProps) {
    let displayFirst = first.toString()
    let displayLast = (first+bubbleCount-1).toString()

    while(displayFirst.length < significantDigits){
        displayFirst = "0" + displayFirst
    }
    while(displayLast.length < significantDigits){
        displayLast = "0" + displayLast
    }

    function generateDotGridSVG(bubbleStates: boolean[]) {
        const cellSize = 10
        const dotRadius = cellSize * 0.35

        const circles = bubbleStates.map((isGreen, i) => {
            const col = i%10
            const row = Math.floor(i / 10)
            const cx = col * cellSize + cellSize / 2
            const cy = row * cellSize + cellSize / 2
            const color = isGreen ? 'oklch(52.7% 0.154 150.069)' : 'oklch(37.3% 0.034 259.733)'

            return `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${color}" />`
        }).join('')

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${circles}</svg>`

        return `data:image/svg+xml,${encodeURIComponent(svg)}`
    }

    const title = displayFirst + "-" + displayLast
    const gridImage = generateDotGridSVG(bubbleStates)

    const testPercentage = 0.4

    return (
        <div className={`h-full w-full @container`}>
            <div className={`transition-colors duration-200 ease-in-out
                            w-full h-full
                            rounded-[10cqw]
                            select-none
                            cursor-pointer
                            border-module
                            overflow-clip
                            hover:border-amber-600`}
                 style={{
                    backgroundImage: `url("${gridImage}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                 }}>
                <div className={`w-full h-full hover:opacity-0 transition-opacity duration-200 grid grid-cols-[0.4fr_0.6fr]`}>
                    <div className="bg-indigo-950/80 col-start-1 row-start-1 w-full rounded-r-[7cqw]"></div>
                    <div className="bg-background/80 col-start-2 row-start-1 w-full"></div>
                    <div className="grid col-start-1 col-end-3 row-start-1 place-items-center
                                    awesome-text text-[20cqw] w-full h-full hover:opacity-0 transition-opacity duration-100">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(BubbleGroupPreview)