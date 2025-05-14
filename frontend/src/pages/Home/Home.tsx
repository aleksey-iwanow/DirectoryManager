import { Link, useParams } from 'react-router-dom';
import FileBrowser from '../../components/FileBrowser/FileBrowser';
import FilesTree from '../../components/FilesTree/FilesTree';

import styles from './Home.module.css';

import {useState } from 'react';
import PathLinksHorizontal from '../../components/PathLinksHorizontal/PathLinksHorizontal';


export default function Home() {
    const [activeTree, setActiveTree] = useState(true);
    const { "*": path } = useParams();

    const handleActiveTree = () => {
        setActiveTree(!activeTree);
    }


    return (<div className={styles.home}>
        <div className={`${styles.left} ${!activeTree ? styles.hide : ''}`}>
            <div className='flex_center_align gap margin_bottom10'>
                <div className='but_icon' onClick={handleActiveTree}>
                    <img src='/icons/hide.png' />
                </div>
                <h3>Upload Files</h3>
            </div>

            <FilesTree className={styles.files_tree}></FilesTree>
        </div>

        <div className={styles.right}>
            <div className='flex_center_align gap margin_bottom20'>
                <div className={`but_icon ${activeTree ? styles.hide : ''}`} onClick={handleActiveTree}>
                    <img src='/icons/show.png' />
                </div>
               {<PathLinksHorizontal path={path}/>}
            </div>
            <FileBrowser></FileBrowser>
        </div>

    </div>)
}