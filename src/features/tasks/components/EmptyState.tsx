import { LightBulbIcon } from '@heroicons/react/24/solid';

export default function EmptyState() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-[50vh]">
            <div className="p-8 flex flex-col justify-center items-center gap-4 ">
                <LightBulbIcon className="h-12 w-12 text-gray-500" />
                <p className="text-gray-500 text-lg">
                    Add a task to get started!
                </p>
            </div>
        </div>
    );
}
