import { useFormStatus } from "react-dom";
import createUsername from "./ServerActions/createUsername";
import { useState, useEffect } from "react";

function SubmitButton({ validInput }: { validInput: boolean }) {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={(pending || !validInput)} className={`px-4 py-2 text-white rounded ${(pending || !validInput) ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"}`}>{pending ? "Please wait..." : "Create username"}</button>
    )
}

export default function CreateUsernamePage() {
    const [userName, setUserName] = useState("")
    const [validInput, setValidInput] = useState(false)

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    useEffect(() => {
        const isUrlSafe = (input: string) => {
            return encodeURIComponent(input) === input;
        }

        setValidInput(isUrlSafe(userName));
    }, [userName]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="p-6 bg-white rounded shadow-md" action={createUsername}>
                <h1 className="py-5 text-xl font-semibold text-center">Create a username:</h1>
                <input 
                    type="text" 
                    name="userName" 
                    placeholder="Username"
                    value={userName}
                    onChange={handleUserNameChange}
                    required 
                    className={`w-full p-2 mb-4 rounded transition-colors duration-500 ease-in-out ${validInput ? 'bg-gray-100' : 'bg-red-100'}`}
                />
                <SubmitButton validInput={validInput} />
            </form>
        </div>
    )
}
