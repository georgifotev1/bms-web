export const MainRoute = () => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    return <div>Brand: {subdomain}</div>;
};
