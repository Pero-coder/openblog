import { useFormStatus, useFormState } from "react-dom";
import createUsername from "@/components/ServerActions/createUsername";
import { useState, useEffect } from "react";

const initialState = {
    message: '',
    type: ''
}

function SubmitButton({ validInput, state }: { validInput: boolean, state: string }) {
    const { pending } = useFormStatus()

    return (
        <button 
            type="submit" 
            disabled={(pending || !validInput || state === "success")} 
            className={`px-4 py-2 text-white rounded ${(pending || !validInput) ? "bg-slate-500" : state === "success" ? "bg-green-400" : "bg-blue-500 hover:bg-blue-400"}`}
        >
            {pending ? "Please wait..." : state === "success" ? "Success" : "Create username"}
        </button>
    )
}

export default function CreateUsernamePage() {
    const [userName, setUserName] = useState("")
    const [validInput, setValidInput] = useState(false)
    const [state, formAction] = useFormState(createUsername, initialState)

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    useEffect(() => {
        const isUrlSafe = (input: string) => {
            return encodeURIComponent(input) === input;
        }

        setValidInput(isUrlSafe(userName));
    }, [userName]);

    useEffect(() => {
        if (state?.type === "success") {
            window.location.reload();
        }
    }, [state]);

    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col gap-5 w-full max-w-md mx-auto shadow-md bg-white p-6 rounded-lg">
                <div className="text-center">
                    <p className="mb-4 text-gray-700">Thanks for creating an account on</p>
                    <h1 className="mb-2 text-4xl font-semibold text-blue-500">OpenBlog</h1>
                    <p className="text-gray-700">In order to continue, please create a username:</p>
                </div>
                {(state.type === "error" || state.type === "warning") && (
                    <div className={`p-4 mb-4 ${state.type === "error" ? "bg-red-500 text-white" : "bg-yellow-300"} rounded`}>
                        <p>{ state.message }</p>
                    </div>
                )}
                <form action={formAction}>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUserNameChange}
                        maxLength={20}
                        required
                        className={`w-full p-2 mb-4 rounded transition-colors duration-500 ease-in-out ${validInput ? 'bg-gray-100' : 'bg-red-100'}`}
                    />
                    <SubmitButton validInput={validInput} state={state.type} />
                </form>
            </div>
        </div>
    )
}
