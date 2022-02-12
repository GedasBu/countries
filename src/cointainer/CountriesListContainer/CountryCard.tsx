import {Countries} from '../../api/countries/types'
import styles from './CountryCard.module.css'

const CountryCard =({name, region, area}: Countries): JSX.Element=> {

    return (
        <div className={styles.card}>
           
                 <span><b>Name: </b>{name}</span>
            <span><b>Region:</b> {region}</span>
            <span><b>Area:</b> {area}</span>
           
           
        </div>

    )
}

export default CountryCard;