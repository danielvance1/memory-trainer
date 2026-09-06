import MappingBubble from "./MappingBubble"

type TripleDigitMappingBubbleContainerProps = {
    mappings: Record<string, string>
    setSelectedMappingDigits: (digits: string) => void;
}

export default function TripleDigitMappingBubbleContainer({ mappings, setSelectedMappingDigits }: TripleDigitMappingBubbleContainerProps) {
    const digitsList: string[] = Array.from(
        { length: 1000 },
        (_, index) => {
            if(index<10){
                return "00" + index.toString()
            }
            else if(index<100){
                return "0" + index.toString()
            }
            else return index.toString()
        }
    )
    
    return (
        <div className="w-full min-w-0 aspect-10/95 grid grid-rows-[1fr_100fr]">
            <div className="flex items-center justify-start
                            text-[8cqw]
                            text-gray
                            sticky top-0">
                000-999
            </div>
            <div className='grid aspect-1/10 grid-cols-10 grid-rows-100 
                            place-items-center gap-1 min-w-0'>
                {digitsList.map((digits) => (
                    <MappingBubble
                        key={digits}
                        digits={digits}
                        description={mappings[digits]}
                        setSelectedMappingDigits={ setSelectedMappingDigits }
                    />
                ))}
            </div>
        </div>
    )
}