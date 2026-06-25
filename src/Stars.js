export function Stars({productRating, fontSize = 13}) {
    return (
        <div className = "starsRow">
            {[1,2,3,4,5].map(i => (
                <span key = {i} 
                className = {i <= productRating ? 'star lit' : 'star'}
                style = {{fontSize : fontSize}}
                >★</span>
            ))}
        </div>
    );
}

{/*UI Allowing to pick # of Stars for revieiw*/}
export function StarPicker({value, onChange}) {
    return (
        <div className = "starPickerRow">
            {[1,2,3,4,5].map(i => (
                <button key = {i}
                    onClick = {() => onChange(i)}
                    className = {i <= value ? 'star lit' : 'star'}
                >★</button>
            ))}
        </div>
    );
}