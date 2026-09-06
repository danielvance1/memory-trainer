import MappingBubble from "./MappingBubble"
import TextField from "./TextField"

type MappingEditorProps = {
    inEditMode : boolean
    selectedMappingDigits : string
    setInEditMode: (inEditMode: boolean) => void;
    mappings: Record<string,string>
}

export default function MappingEditor({ inEditMode, selectedMappingDigits, setInEditMode, mappings }: MappingEditorProps) {
    const selectedMappingDescription = mappings[selectedMappingDigits]
    
    
    return (
        <div className="grid grid-cols-3 aspect-3/1 w-full gap-4">
            <div className="col-start-1 col-span-2 aspect-2/1">
                <TextField currentText={selectedMappingDescription} setText={()=>{}}/>
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
                        description={selectedMappingDescription}
                        setSelectedMappingDigits={(str : string) => {}}
                    />
                )}
            </div>
        </div>
    )
}