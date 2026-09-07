type TextFieldProps = {
    currentText?: string
}

export default function TextField({ currentText }: TextFieldProps) {
    return (
        <form>
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