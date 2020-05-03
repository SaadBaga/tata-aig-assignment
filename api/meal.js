import fetch from 'isomorphic-unfetch';
import config from '../config/index';

export const editMeal = async (apiToken = null, mealId) => {
    let header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    apiToken ? header.Authorization = apiToken : null;
    let data = await fetch(`${config.API_URL}/cms/meallistall`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            search: {
                mealId
            }
        })
    });
    data = await data.json();
    return data
}

export const mealList = async (apiToken = null) => {
    let header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    apiToken ? header.Authorization = apiToken : null;
    let data = await fetch(`${config.API_URL}/cms/meallistall`, {
        method: "POST",
        headers: header
    });
    data = await data.json();
    return data
}

export const addMeal = async (apiToken = null, postData) => {
    let header = {
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    apiToken ? header.Authorization = apiToken : null;
    let data = await fetch(`${config.API_URL}/cms/mealinsert`, {
        method: "POST",
        headers: header,
        body: postData
    });
    if (data.status === 200) {
        data = await data.json();
    }
    return data
}

export const updateMeal = async (apiToken = null, postData) => {
    let header = {
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    apiToken ? header.Authorization = apiToken : null;
    let data = await fetch(`${config.API_URL}/cms/mealupdate`, {
        method: "POST",
        headers: header,
        body: postData
    });
    if (data.status === 200) {
        data = await data.json();
    }
    return data
}

export const inactiveMeal = async (apiToken = null, mealIds) => {
    let header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    apiToken ? header.Authorization = apiToken : null;
    let data = await fetch(`${config.API_URL}/cms/inactivemeal`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            mealIds
        })
    });
    data = await data.json();
    return data
}
