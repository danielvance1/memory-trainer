import BubbleGroup from "./BubbleGroup"
import { BubbleState } from "../types"
import { memo } from "react"

type ScrollingMappingBubbleDisplayProps = {
    setSelectedMappingDigits: (digits: string) => void;
    registerBubble?: (
        digits: string, 
        setBubbleState: (bubbleState: BubbleState) => void
    ) => void
}

function ScrollingMappingBubbleDisplay({ setSelectedMappingDigits, registerBubble }: ScrollingMappingBubbleDisplayProps) {    
    console.log("scrolling component rendered")

    const starts: number[] = Array.from(
        { length: 10 },
        (_, index) => {
            return index*100
        }
    )
    
    return (
        <div className="grid grid-rows-[auto_auto_auto] gap-2
                        overflow-y-auto w-full
                        scrollbar-track-neutral-1000
                        scrollbar-thumb-gray-700
                        rounded-2xl 
                        border-module
                        pr-3 pb-3 pl-3
                        @container">
            <BubbleGroup first={0} 
                         last={9} 
                         length={1}
                         alertOnBubbleClicked={setSelectedMappingDigits}
                         registerBubble={registerBubble}/>
            <BubbleGroup first={0} 
                         last={99} 
                         length={2}
                         alertOnBubbleClicked={setSelectedMappingDigits}
                         registerBubble={registerBubble}/>

            {starts.map((start) => (
                <BubbleGroup key={start}
                             first={start} 
                             last={start+99} 
                             length={3}
                             alertOnBubbleClicked={setSelectedMappingDigits}
                             registerBubble={registerBubble}/>
            ))}
        </div>
    )
}

export default memo(ScrollingMappingBubbleDisplay)