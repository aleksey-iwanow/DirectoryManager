import { useEffect, useState } from 'react';
import styles from './ListItem.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface ItemProps {
    name: string;
    isFolder?: any;
    path: string;
    click?:any;
}

export default function ListItem({ name, path, isFolder, click }: ItemProps) {
    const getHref = () => `/blob/${path}`;
    const navigate = useNavigate();

    const handleNavigate = () => { 
        navigate(getHref())
    }

    
    return (
        <>
            <div className={styles.item} onClick={handleNavigate}>
                <div className={styles.item_content}>
                    <img src={isFolder ? '/icons/folder.png' : '/icons/file.png'}></img>
                    <Link to={getHref()} onClick={click}>{name}</Link>
                </div>
            </div>

        </>
    );
}