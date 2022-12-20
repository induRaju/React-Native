export const apiCall = async (url, method, reqBody) => {
    var response;
    if(method === 'GET' || method === 'DELETE'){
        response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
    else if(method === 'POST' || method === 'PUT'){
        response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
    }
    const res = await response.json();
    return res;
}


export const apiCall_customheader = async (url, method, reqBody, header) => {
    // console.log('header>>', header);
    var response;
    if(method === 'GET' || method === 'DELETE'){
        response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': header
            }
        })
    }
    else if(method === 'POST' || method === 'PUT'){
        response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': header
            },
            body: JSON.stringify(reqBody)
        })
    }
    const res = await response.json();
    return res;
}

export const apiCall_customheaderpas = async (url, method, reqBod, header) => {
    // console.log('header>>', header);
    var response;
    if(method === 'GET' || method === 'DELETE'){
        response = await fetch(url, {
            method: method,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'grant_type': 'password',
                'Authorization': header
            },
            body: JSON.stringify(reqBod)
        })
    }
    else if(method === 'POST' || method === 'PUT'){
        response = await fetch(url, {
            method: method,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'grant_type': 'password',
                'Authorization': header
            },
            body: JSON.stringify(reqBod)
        })
    }
    const res = await response.json();
    return res;
}