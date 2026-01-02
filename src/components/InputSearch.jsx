function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value)
        }, delay);
    };
}


import { useState, useEffect, useCallback } from 'react';

function InputSearch() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

   const handleFetch = useCallback(
    debounce((query) => {
        if (query.length > 0) {
            fetch(`http://localhost:3333/products?search=${query}`)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data);
                    console.log(query); 
                })
                .catch(error => console.error(error));
        } else {
            setSuggestions([]);
        }
    }, 1000),
    [] 
);

    useEffect(() => {
        handleFetch(search)
    }, [search]);

    const handleSelect = (name) => {
        setSearch(name);
        setSuggestions([]);
    };

    return (
        <div className="row">
            <h1>Cerca il tuo prodotto!</h1>
            <input
                type='text'
                placeholder='Cerca prodotto...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {suggestions.length > 0 && (
                <ul className="prod-list">
                    <li id="title">SUGGERIMENTI</li>
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => handleSelect(item.name)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InputSearch;
