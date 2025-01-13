
import { auth, signOut } from "@/auth"

export default async function Dashboard (){
    const session = await auth()
    return (
        <div>
            Dashboard Page
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button className="bg-white text-black p-2" type="submit">
                    Sign OUt
                </button>
            </form>
        </div>
    )
}