export default function ({onClose, onPublish}) {
    return(
        <div className = "newReviewPopup">
            <div className = "newReviewBox">
                <button className = "closeButton" onClick = {onClose}>
                    X
                </button>
                
            </div>
        </div>
    )
}