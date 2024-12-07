import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
import Chatbot from "@/components/Chatbot";

function HomePage() {
    return (
        
        <div className="flex min-h-screen flex-col items-center justify-center gap-16">
            <div className="my-12 flex h-full min-w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
                <div className="flex w-full animate-up-down justify-center sm:w-1/2 sm:pl-4">
                    <img
                        src={illustration}
                        alt="Code Sync Illustration"
                        className="mx-auto w-[250px] sm:w-[400px]"
                    />
                </div>
                <div className="text-center">
                <h2 className="text-xl font-bold">Developed by Harsh</h2>
                <h3 className="text-xl font-bold">Section 32, Team 17</h3>
            </div>
                <div className="flex w-full items-center justify-center sm:w-1/2">
                    <FormComponent />
                </div>
            </div>
            <Chatbot />
            
        </div>
    )
}

export default HomePage;