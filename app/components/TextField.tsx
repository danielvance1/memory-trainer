type TextFieldProps = {
    currentText?: string
    setText: (digits: string) => Promise<void>;
}

export default function TextField({ currentText, setText }: TextFieldProps) {
    return (
        <form onSubmit={async (e) => setText(e.target.value)}>
            <input className="h-full w-full focus:outline-hidden
                          rounded-2xl 
                          border-module
                          p-3
                          resize-none
                          flex items-start justify-start" 
               defaultValue={currentText ?? ""}
               placeholder="Enter description" />
        </form>
    )
}