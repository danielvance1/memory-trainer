import MappingBubble from "./MappingBubble"

type DoubleDigitMappingBubbleContainerProps = {
    mappings: Record<string, string>
    setSelectedMappingDigits: (digits: string) => void;
}

export default function DoubleDigitMappingBubbleContainer({ mappings, setSelectedMappingDigits }: DoubleDigitMappingBubbleContainerProps) {
    const digitsList: string[] = Array.from(
        { length: 100 },
        (_, index) => {
            if(index<10){
                return "0" + index.toString()
            }
            else return index.toString()
        }
    )
    
    return (
        <div className="w-full min-w-0 aspect-10/11 grid grid-rows-[1fr_10fr]">
            <div className="flex items-center justify-start
                            text-[8cqw]
                            text-gray
                            sticky top-0">
                00-99
            </div>
            <div className='grid aspect-square grid-cols-10 grid-rows-10 place-items-center gap-1'>
                {digitsList.map((digits) => (
                    <MappingBubble
                        key={digits}
                        digits={digits}
                        description={mappings[digits]}
                        setSelectedMappingDigits = {setSelectedMappingDigits}
                    />
                ))}
            </div>
        </div>
    )
}