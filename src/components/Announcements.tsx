import Image from "next/image";
const Announcements = () => {
    return <div className='bg-white rounded-md p-4'>
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold my-4'>Announcements</h1>
            <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className="bg-skyLight rounded-md p-4">
                <div className='flex justify-between items-center'>
                    <h1 className=''>Announcement 1</h1>
                    <span className='text-gray-400 text-xs bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='mt-2 text-gray-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
            <div className="bg-purpleLight rounded-md p-4">
                <div className='flex justify-between items-center'>
                    <h1 className=''>Announcement 2</h1>
                    <span className='text-gray-400 text-xs bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='mt-2 text-gray-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
            <div className="bg-yellowLight rounded-md p-4">
                <div className='flex justify-between items-center'>
                    <h1 className=''>Announcement 3</h1>
                    <span className='text-gray-400 text-xs bg-white rounded-md px-1 py-1'>2025-01-01</span>
                </div>
                <p className='mt-2 text-gray-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
        </div>
    </div>;
};

export default Announcements;