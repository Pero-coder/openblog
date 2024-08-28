import { SignIn } from "@/components/SignButtons/sign-in";

export default function WelcomePage({
    setGuest,
}: {
    setGuest: (guest: boolean) => void;
}) {
    return (
        <div className="flex flex-col min-h-screen justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-blue-500">
                OpenBlog
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
                Welcome to the free and opensource blogging social network!
            </p>
            <div className="flex gap-3 items-center justify-center">
                <SignIn />
                <button
                    onClick={() => setGuest(true)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Visit as Guest
                </button>
            </div>
        </div>
    );
}
