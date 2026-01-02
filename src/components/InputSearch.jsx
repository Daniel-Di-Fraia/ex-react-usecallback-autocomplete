import { useState, useEffect } from 'react';

function InputSearch() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (search.length > 0) {
            fetch(`http://localhost:3333/products?search=${search}`)
                .then(res => res.json())
                .then(data => setSuggestions(data))
                .catch(error => console.error(error));
        } else {
            setSuggestions([]);
        }
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
