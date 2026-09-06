import SingleDigitMappingBubbleContainer from "./SingleDigitMappingBubbleContainer"
import DoubleDigitMappingBubbleContainer from "./DoubleDigitMappingBubbleContainer"
import TripleDigitMappingBubbleContainer from "./TripleDigitMappingBubbleDisplay"
import BubbleGroup from "./BubbleGroup"

type ScrollingMappingBubbleDisplayProps = {
    mappings: Record<string, string>
    setSelectedMappingDigits: (digits: string) => void;
}

export default function ScrollingMappingBubbleDisplay({ mappings, setSelectedMappingDigits }: ScrollingMappingBubbleDisplayProps) {    
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
                         mappings={mappings} 
                         setSelectedMappingDigits={setSelectedMappingDigits}/>
            <BubbleGroup first={0} 
                         last={99} 
                         length={2}
                         mappings={mappings} 
                         setSelectedMappingDigits={setSelectedMappingDigits}/>
            
            {/* <SingleDigitMappingBubbleContainer mappings={mappings} setSelectedMappingDigits={setSelectedMappingDigits} /> */}
            {/* <DoubleDigitMappingBubbleContainer mappings={mappings} setSelectedMappingDigits={setSelectedMappingDigits} /> */}
            {starts.map((start) => (
                <BubbleGroup key={start}
                             first={start} 
                             last={start+99} 
                             length={3}
                             mappings={mappings} 
                             setSelectedMappingDigits={setSelectedMappingDigits}/>
            ))}
            
            {/* <TripleDigitMappingBubbleContainer mappings={mappings} setSelectedMappingDigits={setSelectedMappingDigits} /> */}
        </div>
    )
}