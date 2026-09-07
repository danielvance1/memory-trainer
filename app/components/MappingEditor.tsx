import MappingBubble from "./MappingBubble"
import TextField from "./TextField"

type MappingEditorProps = {
    inEditMode : boolean
    selectedMappingDigits : string
}

export default function MappingEditor({ inEditMode, selectedMappingDigits }: MappingEditorProps) {
    const selectedMappingDescription = "<not set>"
    
    
    return (
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 aspect-3/1 w-full min-w-0">
            <div className="col-start-1 col-span-2">
                <TextField currentText={selectedMappingDescription} />
            </div>
            {/* <div onClick={() => setInEditMode(false)} className="bg-amber-600">Exit edit mode</div> */}
            <div className="bg-neutral-1000
                            rounded-2xl 
                            border-module
                            p-3
                            aspect-square
                            w-full">
                { inEditMode && (
                    <MappingBubble
                        digits={selectedMappingDigits}
                    />
                )}
            </div>
        </div>
    )
}