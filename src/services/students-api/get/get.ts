export const get = async (): Promise<any[] | null> => {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (Array.isArray(data)) 
            return data;
    } catch (error) {
        console.log(error);
    }

    return null;
}

const URL = 'http://vps-a47222b1.vps.ovh.net:4242/student';