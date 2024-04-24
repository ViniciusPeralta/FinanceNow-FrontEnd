import styles from './ConfirmWarning.module.css'

import Modal from 'react-modal';

import warningStore from '../../../store/warning/WarningStore.ts'
import BasicButton from '../../buttons/BasicButton.js';

const ConfirmWarning = ({ handleYesClick }) => {

    const { message, confirmWarning, closeWarning } = warningStore()

    Modal.setAppElement('#root');

    function handleClose() {
        closeWarning();
    }

    return (
        <Modal
            isOpen={confirmWarning}
            onRequestClose={closeWarning}
            className={styles.modal}>
            <div className={styles.icon}>
                <div className={styles.circle}>
                    <h1 className={styles.x}>! </h1>
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
            <h1>Confirmação</h1>
            <div className={styles.line} />
            <h1 className={styles.text}>{message}</h1>
            <div className={styles.optionContainer}>
                <div className={styles.yes}>
                    <BasicButton
                        text={'\u00A0SIM\u00A0'}
                        fontSize={20}
                        color='black'
                        border={2}
                        onClick={handleYesClick}
                    />
                </div>
                <div>
                    <BasicButton
                        text={'\u00A0NAO\u00A0'}
                        fontSize={20}
                        color='black'
                        border={2}
                        onClick={handleClose}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmWarning