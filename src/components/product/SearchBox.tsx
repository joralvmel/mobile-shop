
interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function SearchBox({ value, onChange, placeholder = 'Search...' }: SearchBoxProps) {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
}

export default SearchBox;
