type Props = {}

const InfoBar = (props: Props) => {
    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
            <span className="flex items-center gap-2 font-bold">
                <p className="text-sm font-light text-gray-300">
                    Credits
                </p>
            </span>
        </div>
    )
}

export default InfoBar