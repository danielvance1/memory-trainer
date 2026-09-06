type TextFieldProps = {
    currentText?: string
    setText: (digits: string) => void;
}

export default function TextField({ currentText, setText }: TextFieldProps) {
    return (
        <textarea className="h-full w-full focus:outline-hidden
                          rounded-2xl 
                          border-module
                          p-3
                          resize-none
                          flex items-start justify-start" 
               value={currentText ?? ""}
               placeholder="Enter description"
               onChange={(e) => setText(e.target.value)} />
    )
}