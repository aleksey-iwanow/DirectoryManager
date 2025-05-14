import { useEffect, useState } from 'react';
import styles from './ButtonsPanel.module.css';

interface ButtonsPanelProps {
    elements: any[];
}

export default function ButtonsPanel({ elements }: ButtonsPanelProps) {

    return (
        <div className={styles.container_toggle}>
            {elements.map((elem, index) => (<div
                onClick={(elem.onClick)}
                key={index}
                className={`
                    ${styles.item_toggle} 
                    ${index != elements.length-1 && styles.line_toggle}`}>
                { elem.img ? <img src={elem.img} /> : elem.name }

            </div>

            ))}
        </div>
    )
}