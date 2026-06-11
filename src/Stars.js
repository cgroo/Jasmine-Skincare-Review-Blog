export function Stars({productRating, fontSize = 13}) {
    return (
        <div className = "starsRow">
            {[1,2,3,4,5].map(i => (
                <span key = {i} 
                className = {i <= productRating ? 'litStar' : 'star'}
                style = {{fontSize : fontSize}}
                >★</span>
            ))}
        </div>
    );
}

export function StarPicker({value, onChange}) {
    return (
        <div className = "starPickerRow">
            {[1,2,3,4,5].map(i => (
                <button key = {i}
                    onClick = {() => onChange(i)}
                    className = {i <= value ? 'selectedStar': 'star'}
                >★</button>
            ))}
        </div>
    )
}