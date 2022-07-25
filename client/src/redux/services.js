export const addCard = async (card) => {

    const response = await fetch('cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(card)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
};



export const getCards = async () => {
    const response = await fetch('cards', {
        method: 'GET',
    });
    return response.json();
}

export const searchCards = async (params) => {
    const response = await fetch('cards?' + new URLSearchParams({
        type: params.type,
        keywords: params.keywords
    }), {
        method: 'GET'
    })
    return response.json()
}

export const editCard = async (card) => {
    const response = await fetch('cards', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(card)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
}

export const deleteCard = async (id) => {
    const response = await fetch('cards/' + id, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
}


export const reset = async () => {
    const response = await fetch('cards', {
        method: 'DELETE',
    });

    return response.status;
}

