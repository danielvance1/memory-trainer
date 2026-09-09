'use client'


import { motion } from 'framer-motion'
import { useState } from 'react'
import BubbleGroupPreview from '../components/BubbleGroupPreview'
import { BubbleGroupPreviewProps } from '../components/BubbleGroupPreview'

export default function MappingsPage() {
    const [hyperFocus, setHyperFocus] = useState(false)
    const [expandedIdx, setExpandedIdx] = useState(-1)


  // const digitsRegex = /^\d{1,3}$/;
  // function isValidDigitSequence(digits: string) {
  //   return digits != null && digitsRegex.test(digits)
  // }

  // const bubbleControllers: useRef<Record<string, (bubbleState: BubbleState) => void>> = ({})
  // function registerBubble(digits: string, setBubbleState: (bubbleState: BubbleState) => void) {
  //   if(isValidDigitSequence(digits)){
  //     bubbleControllers[digits] = setBubbleState;
  //   }
  // }

    const testData: boolean[] = Array.from(
        { length: 100 },
        (_, index) => {
            return Math.floor(index*113/10) % 2 == 0
        }
    )

    const bubbleGroupPreviewPropsList: BubbleGroupPreviewProps[] = []
    bubbleGroupPreviewPropsList.push({
        first: 0,
        bubbleCount: 10,
        significantDigits: 1,
        bubbleStates: testData
    })
    bubbleGroupPreviewPropsList.push({
        first: 0,
        bubbleCount: 100,
        significantDigits: 2,
        bubbleStates: testData
    })
    for(let i = 0; i < 10; i++){
        bubbleGroupPreviewPropsList.push({
            first: i*100,
            bubbleCount: 100,
            significantDigits: 3,
            bubbleStates: testData
        })
    }
    
    const expandedPosition = {
        gridRowStart: 1,
        gridRowEnd: 4,
        gridColumnStart: 1,
        gridColumnEnd: 4
    }

    return (
        // <div className="aspect-1/3 bg-red-50 h-screen">
        //     {/* <div className="awesome-text">Edit mappings</div>
        //     <div className="w-grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr]">
        //         {squareIds.map(id => (
        //             <div key={id} className="aspect-square bg-amber-700">
        //                 {id}
        //             </div>
        //         ))}
        //     </div> */}
        // </div>
        // <MappingsView />
        // <div className="grid grid-cols-[1fr] h-screen w-full bg-amber-50">

        // </div>
        <div className="w-full h-dvh flex items-center justify-center">
            <div className="w-[min(100vw,calc(100vh*9/13))] h-[min(100vh,calc(100vw*13/9))] p-3">
                <div className="border-module border-amber-600 grid grid-rows-[1fr_12fr] h-full w-full @container">
                    <div className="awesome-text m-1 text-[7cqw] flex justify-center items-center glow-text">Click group to expand</div>
                    <div className="grid grid-rows-4 grid-cols-3 gap-[3cqw] p-[3cqw]">
                        {bubbleGroupPreviewPropsList.map((props, index) => {
                            const row = Math.floor(index/3) + 1
                            const col = index%3+1

                            const startPosition = {
                                gridRowStart: row,
                                gridRowEnd: row+1,
                                gridColumnStart: col,
                                gridColumnEnd: col+1
                            }

                            return (
                                <motion.div key={index}
                                     layout
                                     transition={{ duration: 0.3, ease: 'easeInOut'}}
                                     className="hover:z-10 cursor-pointer pointer-events-none"
                                     onMouseEnter={() => setHyperFocus(true)}
                                     onMouseLeave={() => setHyperFocus(false)}
                                     onClick={() => setExpandedIdx(index)}
                                    style={expandedIdx==index ? { ...expandedPosition } : { ...startPosition }}>
                                    <BubbleGroupPreview 
                                        first={props.first}
                                        bubbleCount={props.bubbleCount}
                                        significantDigits={props.significantDigits}
                                        bubbleStates={testData}/>
                                </motion.div>
                            )
                        })}
                        <div className={`${hyperFocus ? "opacity-80" : "opacity-0"} transition-opacity duration-800 bg-background col-start-1 col-end-4 row-start-1 row-end-5 pointer-events-none z-0`}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}