import { useState } from 'react'

import MappingEditor from "./MappingEditor"
import ScrollingMappingBubbleDisplay from "./ScrollingMappingBubbleDisplay"

type MappingsViewProps = {
    mappings: Record<string,string>
    setDescription: (digits: string, description: string) => Promise<void>;
}

export default function MappingsView({mappings, setDescription}: MappingsViewProps) {
    const [inEditMode, setInEditMode] = useState(false)
    const [selectedMappingDigits, setSelectedMappingDigits] = useState("")

    const digitsRegex = /^\d{1,3}$/;

    function safeSetSelectedMappingDigits(digits: string){
        if(digits == null || !digitsRegex.test(digits)) return

        console.log(`setting digits to ${digits}`)

        setSelectedMappingDigits(digits)
        setInEditMode(true)
    }

    return (
        <div className="grid grid-rows-[auto_1fr_auto] max-w-[500px] gap-4 h-screen @container 
                        pt-10 pb-10 pr-10">
            <div className="text-[8cqw] awesome-text">
                Digit Mappings
            </div>
            <ScrollingMappingBubbleDisplay mappings={mappings} setSelectedMappingDigits={safeSetSelectedMappingDigits} />
            <MappingEditor setDescription={async (description: string) => setDescription(selectedMappingDigits, description)} 
                           inEditMode={inEditMode} 
                           selectedMappingDigits={selectedMappingDigits}
                           mappings={mappings} />
        </div>
    )
}