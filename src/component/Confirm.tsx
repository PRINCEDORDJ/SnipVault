import { ArrowRight, Mail } from "lucide-react"
import { Link } from "react-router-dom";

export default function Confirmation() {
    
    return (
      <div className="pt-30 pb-10">
        <div className="w-full flex items-center justify-center">
          <div className="shadow-md shadow-blue-500 rounded-md py-5 px-5 flex flex-col items-center justify-center w-sm lg:w-md">
            <div className="bg-black rounded-full w-15 h-15 flex items-center justify-center">
              <Mail size={50} color="green" />
            </div>
            <div className="flex flex-col pt-10">
                        <h1>A confimation Email has been sent to your Inbox</h1>
                        <p>Validate witht the link to continue</p>
                    </div>
                    <div className="w-full pt-4 text-white">
                        <Link to={'/'} className="flex items-center justify-center gap-2 bg-blue-500 w-full p-2 rounded-lg">
                            <p>Back to LogIn</p>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
          </div>
        </div>
      </div>
    );
}