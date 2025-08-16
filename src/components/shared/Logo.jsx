import { Bed } from "lucide-react"
import React from "react"
import { Link } from "react-router"

const Logo = ({ name }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        {/* Small screen icon */}
        <div className="flex items-center md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bed className="h-5 w-5" />
            
          </div>
          <p className="text-xl font-bold pl-5">KJH</p>
        </div>

        {/* Large screen logo */}
        <Link to={"/"}>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bed className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">{name}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Logo
