export const addCard = async (card) => {

    const response = await fetch('https://localhost:3001/cards', {
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
    const response = await fetch('https://localhost:3001/cards', {
        method: 'GET',
    });
    return response.json();
}

