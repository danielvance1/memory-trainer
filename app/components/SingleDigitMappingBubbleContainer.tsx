import MappingBubble from "./MappingBubble"

type SingleDigitMappingBubbleContainerProps = {
    mappings: Record<string, string>
    setSelectedMappingDigits: (digits: string) => void;
}

export default function SingleDigitMappingBubbleContainer({ mappings, setSelectedMappingDigits }: SingleDigitMappingBubbleContainerProps) {
    const digitsList: string[] = Array.from(
        { length: 10 },
        (_, index) => index.toString()
    )
    
    return (
        <div className="w-full min-w-0 aspect-10/2 
                        grid grid-rows-[1fr_1fr]">
            <div className="flex items-center justify-start
                            text-[8cqw]
                            text-gray
                            sticky top-0">
                0-9
            </div>
            <div className='grid aspect-10/1 grid-cols-10 place-items-center gap-1'>
                {digitsList.map((digits) => (
                    <MappingBubble
                        key={digits}
                        digits={digits}
                        description={mappings[digits]}
                        setSelectedMappingDigits={setSelectedMappingDigits}
                    />
                ))}
            </div>
        </div>
    )
}