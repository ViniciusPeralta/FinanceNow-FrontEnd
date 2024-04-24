import styles from './BasicButton.module.css'

const BasicButton = ({ text, fontSize, color, border, onClick }) => {
    return (
        <div className={styles.button}
            style={{
                border: `${border}px solid ${color}`
            }}
            onClick={onClick}>
            <h1 style={{
                color: color,
                fontSize: `${fontSize}px`
            }}>
                {text}
            </h1>
        </div>
    )
}

export default BasicButton