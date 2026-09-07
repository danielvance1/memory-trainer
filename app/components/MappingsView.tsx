import { useState, useCallback } from 'react'

import MappingEditor from "./MappingEditor"
import ScrollingMappingBubbleDisplay from "./ScrollingMappingBubbleDisplay"
import { BubbleState } from '../types'

type MappingsViewProps = {
    registerBubble?: (
        digits: string, 
        setBubbleState: (bubbleState: BubbleState) => void
    ) => void
}

export default function MappingsView({ registerBubble }: MappingsViewProps) {
    const [inEditMode, setInEditMode] = useState(false)
    const [selectedMappingDigits, setSelectedMappingDigits] = useState("")

    const safeSetSelectedMappingDigits = useCallback((digits: string) => {
        const digitsRegex = /^\d{1,3}$/;

        if(digits == null || !digitsRegex.test(digits)) return

        console.log(`setting digits to ${digits}`)

        setSelectedMappingDigits(digits)
        setInEditMode(true)
    }, [])

    return (
        <div className="w-full bg-red-50 grid place-items-center h-screen">
            <div className="grid grid-rows-[1fr] w-full max-w-[500px] gap-4 h-screen bg-red-500 @container 
                        pt-10 pb-10 pr-10">
                {/* <div className="text-[8cqw] awesome-text border-module pl-3">
                    Edit
                </div> */}
                <ScrollingMappingBubbleDisplay setSelectedMappingDigits={safeSetSelectedMappingDigits} registerBubble={registerBubble} />
                {/* <MappingEditor inEditMode={inEditMode} 
                            selectedMappingDigits={selectedMappingDigits} /> */}
            </div>
        </div>
    )
}