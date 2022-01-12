import URL from './setting'
function handleHttpErrors(res)
{
    if (!res.ok)
    {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

let apiFacade = () =>
{

    const fetchData = (endpoint, updateAction, SetErrorMessage) =>
    {
        const options = makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err =>
            {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    

    const login = (user, password, setLoggedIn, setErrorMessage) =>
    {
        const options = makeOptions("POST", true, { username: user, password: password });
        return fetch(URL+ "/api/login", options)
            .then(handleHttpErrors)
            .then(res =>
            {
                setToken(res.token)
                setLoggedIn(true);
                setErrorMessage('Logged in');
            })
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }

    const AddBoat = (brand, make,name ,updateAction, setErrorMessage) =>
    {
        const options = makeOptions("POST", true, { brand: brand, make: make , name: name });
        return fetch(URL+ "/api/harbour/add", options)
            .then(handleHttpErrors)
            .then(res => updateAction(res)) 
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }

    const EditBoat = (brand, make,name ,updateAction, setErrorMessage) =>
    {
        const options = makeOptions("put", true, { brand: brand, make: make , name: name });
        return fetch(URL+ "/api/harbour/", options)
            .then(handleHttpErrors)
            .then(res => updateAction(res)) 
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }



    const DeleteBoat = (b_id ,updateAction, setErrorMessage) =>
    {
        const options = makeOptions("delete", true, {id: b_id });
        return fetch(URL+ "/api/harbour/"+b_id, options)
            .then(handleHttpErrors)
            .then(res => updateAction(res)) 
            .catch((err) =>
            {
                if (err.status)
                {
                    err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                } else
                {
                    setErrorMessage('Network error');
                }
            });
    }


    // Security funktionalitet

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () =>
    {
        const loggedIn = getToken() != null;
        return loggedIn;
    }
    const logout = () =>
    {
        localStorage.removeItem("jwtToken");
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

    const makeOptions = (method, addToken, body) =>
    {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn())
        {
            opts.headers["x-access-token"] = getToken();
        }
        if (body)
        {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return {
        makeOptions,
        fetchData,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        getUserRoles,
        hasUserAccess,
        AddBoat,
        DeleteBoat,
        EditBoat,
    }

}

const facade = apiFacade()

export default facade
