import BasicButton from '../../../components/buttons/BasicButton.js';
import NavBar from '../../../components/navbar/NavBar.js';

import styles from './CompanyList.module.css';

const CompanyList = () => {

    const handleAddCompany = () => {
    }

    return (
        <div>
            <NavBar />
            <div className={styles.grid}>
                <div className={styles.createButton}>
                    <BasicButton
                        border={1}
                        fontSize={13}
                        color='green'
                        text='+ Empresa'
                        onClick={handleAddCompany}
                    />
                </div>
            </div>
        </div>
    )
}

export default CompanyList