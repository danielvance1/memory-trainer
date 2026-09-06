import MappingBubble from "./MappingBubble"

type BubbleGroupProps = {
    first: number
    last: number
    length: number
    mappings: Record<string, string>
    setSelectedMappingDigits: (digits: string) => void;
}

export default function BubbleGroup({ first, last, length, mappings, setSelectedMappingDigits }: BubbleGroupProps) {    
    const digitsList: string[] = Array.from(
        { length: last-first+1 },
        (_, index) => {
            let digitString: string = (index+first).toString()

            while(digitString.length < length){
                digitString = "0" + digitString
            }

            return digitString
        }
    )

    return (
        <div className="w-full min-w-0 grid grid-rows-[auto_auto]">
            <div className="flex items-center justify-start
                            text-[8cqw]
                            text-gray
                            bg-background
                            sticky top-0">
                <span className="awesome-text">
                    {(digitsList[0]?.toString() ?? "") + "-" + (digitsList.at(-1)?.toString() ?? "")}
                </span>
            </div>
            <div className='grid grid-cols-10 place-items-center gap-1'>
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