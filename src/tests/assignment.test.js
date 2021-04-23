const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

require('dotenv').config();

const Login = async(user, password) => {
    let res = '';

    await axios.get(`http://localhost:${process.env.PORT}/login/?name=${user}&password=${password}`) 
    .then(response => {
        res = response.data;
    }).catch(err => {
        //res = err.message
        res = err.response.status;
    });
    return res;
}

const FetchData = async(url, withToken = true) => {
    const config = withToken ? {
        headers: { Authorization: `Bearer ${await Login('admin', 'somepassword')}` }
    } : {};

    let res = '';
    await axios.get(url, config) 
    .then(response => {
        res = response.status;
    }).catch(err => {
        res = err.response.status;
    });
    return res;
}

it('Login with correct credentials', async() => {
    expect(await Login('admin', 'somepassword')).toEqual(expect.not.stringContaining('Unauthorized'));
});

it('Login with wrong credentials', async() => {
    expect(await Login('admin', 'wrongpassword')).toEqual(401);
});

it('Fetch facilities with token', async() => {
    expect(await FetchData(`http://localhost:${process.env.PORT}/facilities/?page=1&sort=name&order=asc&filter={%22name%22:%20%22100%22,%20%22road_name%22:%20%22AN%22}`)).toEqual(200);
});

it('Fetch facilities w/o token', async() => {
    expect(await FetchData(`http://localhost:${process.env.PORT}/facilities/?page=1&limit=100`, false)).toEqual(401);
});

it('Fetch crowd levels with token', async() => {
    expect(await FetchData(`http://localhost:${process.env.PORT}/crowdLevels/?start=2020-11-03T00:00:00.000Z&end=2021-04-23T12:58:00.000Z`)).toEqual(200);
});

it('Fetch crowd levels w/o token', async() => {
    expect(await FetchData(`http://localhost:${process.env.PORT}/crowdLevels/`, false)).toEqual(401);
});