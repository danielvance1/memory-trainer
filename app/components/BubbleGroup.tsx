import MappingBubble from "./MappingBubble"
import { BubbleState } from "../types"
import { memo, useState } from "react"

type BubbleGroupProps = {
    first: number
    last: number
    length: number
    alertOnBubbleClicked: (digits: string) => void;
    registerBubble?: (
        digits: string, 
        setBubbleState: (bubbleState: BubbleState) => void
    ) => void
}

function BubbleGroup({ first, last, length, alertOnBubbleClicked, registerBubble }: BubbleGroupProps) {    
    const [isOpen, setIsOpen] = useState(false)

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
                            sticky top-0"
                 onClick={() => setIsOpen(!isOpen)}>
                <span className="awesome-text">
                    {(digitsList[0]?.toString() ?? "") + "-" + (digitsList.at(-1)?.toString() ?? "")}
                </span>
            </div>
            {isOpen && 
                <div className='grid grid-cols-10 place-items-center gap-1'>
                    {digitsList.map((digits) => (
                        <MappingBubble
                            key={digits}
                            digits={digits}
                            alertOnClick = {alertOnBubbleClicked}
                            registerBubble = {registerBubble}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default memo(BubbleGroup)