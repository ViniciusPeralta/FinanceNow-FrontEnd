import styles from './ErrorWarning.module.css'

import Modal from 'react-modal';

import warningStore from '../../../store/warning/WarningStore.ts'
import BasicButton from '../../buttons/BasicButton.js';

const ErrorWarning = () => {

    const { message, errorWarning, closeWarning } = warningStore()

    Modal.setAppElement('#root');

    function handleClose() {
        closeWarning();
    }

    return (
        <Modal
            isOpen={errorWarning}
            onRequestClose={closeWarning}
            className={styles.modal}>
            <div className={styles.icon}>
                <div className={styles.circle}>
                    <h1 className={styles.x}>X</h1>
                </div>
            </div>
            <div className={styles.close}>
                <BasicButton
                    text={'\u00A0X\u00A0'}
                    fontSize={9}
                    color={'black'}
                    border={1}
                    onClick={handleClose}
                />
            </div>
            <h1>Erro!</h1>
            <div className={styles.line} />
            <h1 className={styles.text}>{message}</h1>
            <BasicButton
                text={'\u00A0OK\u00A0'}
                fontSize={25}
                color='black'
                border={2}
                onClick={handleClose}
            />
        </Modal>
    )
}

export default ErrorWarning