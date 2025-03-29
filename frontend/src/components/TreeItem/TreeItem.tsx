import { useEffect, useState } from 'react';
import styles from './TreeItem.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

interface ItemProps {
    name: string;
    children?: any;
    path: string;
}

export default function TreeItem({ name, children, path }: ItemProps) {
    const [rotation, setRotation] = useState(-90);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFolder, setIsFolder] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFolder(children !== undefined);
    }, []);

    const handleBrowserFile = () => {
        navigate(`/blob/${path}`);
    };

    const handleOpenFolder = () => {
        setRotation(rotation === 0 ? -90 : 0);
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className={styles.item}>
                {isFolder && children.length > 0 ? (
                    <div onClick={handleOpenFolder} className={styles.toggle_folder}>
                        <img
                            style={{ transform: `rotate(${rotation}deg)` }}
                            src={'/icons/arrow.png'}
                        ></img>
                    </div>
                ) : (
                    <div className={styles.empty} />
                )}

                <div onClick={handleBrowserFile} className={styles.item_content}>
                    <img src={isFolder ? '/icons/folder.png' : '/icons/file.png'}></img>
                    <p>{name}</p>
                </div>
            </div>

            <div className={`${styles.children_container} ${isExpanded ? styles.expanded : ''}`}>
                {children}
            </div>
        </>
    );
}