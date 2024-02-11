import { RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function NothingTodoState() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-[50vh]">
            <div className="p-8 flex flex-col justify-center items-center gap-4 ">
                <RocketLaunchIcon className="h-12 w-12 text-gray-500" />
                <p className="text-gray-500 text-lg">Nothing to Do Today!</p>
            </div>
        </div>
    );
}
