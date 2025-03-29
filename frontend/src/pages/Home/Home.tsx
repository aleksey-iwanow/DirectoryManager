import { Link, useParams } from 'react-router-dom';
import FileBrowser from '../../components/FileBrowser/FileBrowser';
import FilesTree from '../../components/FilesTree/FilesTree';
import TreeItem from '../../components/TreeItem/TreeItem';
import styles from './Home.module.css';
import { getPreviousFolder } from "../../utils/FilesManager"
import { useEffect, useState } from 'react';


export default function Home() {
    const [activeTree, setActiveTree] = useState(true);
    const { "*": path } = useParams();

    const handleActiveTree = () => {
        setActiveTree(!activeTree);
    }

    const getPathLinks = () => {
        if (path) {
            const split_path = path.split('/');
            const links = split_path.map((name, index) => (
                {
                    name: name,
                    path: `/blob/${split_path.slice(0, index + 1).join('/')}`,
                }
            ));
            return (<>
                <span style={{ margin: "0 5px" }}>/</span>
                <Link to="/">uploads</Link>
                {links.map((link, index) => (
                    <>
                        <span style={{ margin: "0 5px" }}>/</span>
                        {split_path.length - 1 == index ?
                            <span className='span_bold'>{link.name}</span>
                            :
                            <Link to={link.path}>{link.name}</Link>
                        }
                    </>
                ))}
            </>);
        }
    }


    return (<div className={styles.home}>
        <div className={`${styles.left} ${!activeTree ? styles.hide : ''}`}>
            <div className='flex_center_align gap margin_bottom'>
                <div className='but_icon' onClick={handleActiveTree}>
                    <img src='/icons/hide.png' />
                </div>
                <h3>Upload Files</h3>
            </div>

            <FilesTree className={styles.files_tree}></FilesTree>
        </div>

        <div className={styles.right}>
            <div className='flex_center_align gap margin_bottom'>
                <div className={`but_icon ${activeTree ? styles.hide : ''}`} onClick={handleActiveTree}>
                    <img src='/icons/show.png' />
                </div>
                <pre>{getPathLinks()}</pre>
            </div>
            <FileBrowser></FileBrowser>
        </div>

    </div>)
}