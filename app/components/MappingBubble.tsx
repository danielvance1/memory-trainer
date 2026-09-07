import { BubbleState } from "../types"
import { useState, useEffect, memo } from "react"

type MappingBubbleProps = {
    digits: string
    alertOnClick?: (digits: string) => void;
    registerBubble?: (
        digits: string, 
        setBubbleState: (bubbleState: BubbleState) => void
    ) => void
}

function MappingBubble({digits, alertOnClick, registerBubble }: MappingBubbleProps) {
    const [bubbleState, setBubbleState] = useState(BubbleState.Unset)

    const stateSpecificStyles: Record<BubbleState, string> = {
        [BubbleState.Unset]: "bg-bubble-unset hover:bg-bubble-unset-hover",
        [BubbleState.Set]: "bg-bubble-set hover:bg-bubble-set-hover",
        [BubbleState.Edited]: "bg-bubble-edited hover:bg-bubble-edited-hover"
    }

    useEffect(() => {
        registerBubble?.(digits,setBubbleState)
    }, [digits, registerBubble])

    return (
        <div className={`h-full w-full @container`}>
            <div onClick={() => alertOnClick?.(digits)}
                className={`${stateSpecificStyles[bubbleState]} 
                            transition-colors duration-100 ease-in-out
                            w-full h-full
                            rounded-[10cqw]
                            grid place-items-center 
                            select-none
                            cursor-pointer`}>
                <div className="text-black font-bold text-[45cqw]">
                    {digits}
                </div>
            </div>
        </div>
    )
}

export default memo(MappingBubble)