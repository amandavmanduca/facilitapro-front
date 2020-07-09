export const profIsAuthenticated = () => {
    const token = localStorage.getItem('prof_token');
        if(token !== null){
            return true;
        } else {
            return false;
        }
};

