export const adminIsAuthenticated = () => {
    const token = localStorage.getItem('admin_token');
        if(token !== null){
            return true;
        } else {
            return false;
        }
};

