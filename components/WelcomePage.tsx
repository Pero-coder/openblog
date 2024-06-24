import { SignIn } from "@/components/SignButtons/sign-in";

export default function WelcomePage() {
    return (
        <div className="flex flex-col min-h-screen justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-blue-500">OpenBlog</h1>
          <p className="text-sm sm:text-base md:text-lg">
            Welcome to the free and opensource blogging social network!
          </p>
          <SignIn />
        </div>
    );
}
