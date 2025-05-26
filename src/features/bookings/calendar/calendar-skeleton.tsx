import { Skeleton } from '@/components/ui/skeleton';

function CalendarSkeleton() {
    return (
        <div className='px-10 py-20 mx-auto'>
            <div className='flex items-center justify-between mb-4'>
                <Skeleton className='h-6 w-24' />
                <div className='flex gap-2'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-8 w-8 rounded-full' />
                </div>
            </div>

            <div className='grid grid-cols-7 gap-2 mb-2'>
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className='h-6 w-full' />
                ))}
            </div>

            <div className='grid grid-cols-7 gap-2'>
                {Array.from({ length: 42 }).map((_, i) => (
                    <div key={i} className='aspect-square'>
                        <Skeleton className='h-full w-full' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export { CalendarSkeleton };
