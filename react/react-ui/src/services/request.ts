import {IQueryParams} from "../interfaces";

const ROOT_URL = "http://localhost:8080/api/v1"

const request = {
    post: async function <T, K>(url: string, body: K): Promise<T> {
        const response = await fetch(`${ROOT_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    },

    get: async function <T>(url: string, queryParams?: IQueryParams): Promise<T> {
        let enrichedUrl = `${ROOT_URL}${url}`;
        if (queryParams) {
            enrichedUrl = `${ROOT_URL}${url}?size=${queryParams.size}&page=${queryParams.page}`;
        }

        const response = await fetch(enrichedUrl);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    }
}

export default request;