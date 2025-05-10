import { Spinner } from "./spinner"

export const LoadingScreen = () => {
    return (
        <div className='flex min-h-screen flex-col justify-center items-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
            <Spinner size='lg' />
            <span>Loading...</span>
        </div>
    )
}
