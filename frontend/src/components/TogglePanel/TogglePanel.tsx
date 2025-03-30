import { useEffect, useState } from 'react';
import styles from './TogglePanel.module.css';

interface TogglePanelProps {
    elements: string[];
    onchange: (selected: string) => void;
}

export default function TogglePanel({ elements, onchange }: TogglePanelProps) {
    const [selected, setSelected] = useState(elements[0]);

    const handleClick = (index: number) => {
        setSelected(elements[index]);
    }

    useEffect(() => {
        onchange(selected);
    }, [selected])

    return (
        <div className={styles.container_toggle}>
            {elements.map((elem, index) => (<div
                onClick={() => handleClick(index)}
                key={index}
                className={`
                    ${styles.item_toggle} 
                    ${(index != elements.indexOf(selected) && index != elements.indexOf(selected)-1 && index != elements.length-1) && styles.line_toggle} 
                    ${selected == elem ? styles.active : styles.disable}`}>
                {elem}

            </div>

            ))}
        </div>
    )
}