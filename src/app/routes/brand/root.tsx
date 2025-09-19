import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};

const PublicAppRoot = () => {
    return <Outlet />;
};

export default PublicAppRoot;
