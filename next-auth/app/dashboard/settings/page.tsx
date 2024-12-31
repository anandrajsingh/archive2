"use client"

import { logOut } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";


const Settings = () => {
    const session = useCurrentUser()

    const onClick = () => {
        logOut()
    }
    return (
        <div className="bg-white p-10 rounded-xl">
                <Button onClick={onClick}>
                    sign out
                </Button>
        </div>
    )
}

export default Settings;