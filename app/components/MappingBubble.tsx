type MappingBubbleProps = {
    digits: string
    description?: string
    setSelectedMappingDigits: (digits: string) => void;
}

export default function MappingBubble({digits, description, setSelectedMappingDigits }: MappingBubbleProps) {
    const hasDescription = description != null && description.length > 0

    return (
        <div className="w-full aspect-square @container">
            <div onClick={() => setSelectedMappingDigits(digits)}
                className={`${hasDescription ? "bg-green-700 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"} transition-colors duration-100 ease-in-out
                            w-full aspect-square
                            rounded-[10cqw]
                            grid place-items-center 
                            select-none
                            cursor-pointer`}>
                <div className="text-black font-bold text-[45cqw]">
                    {digits}
                </div>
            </div>
        </div>
    )
}