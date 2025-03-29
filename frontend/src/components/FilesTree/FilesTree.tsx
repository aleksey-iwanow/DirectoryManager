import { useEffect, useState } from "react";
import TreeItem from "../TreeItem/TreeItem";
import styles from "./FilesTree.module.css"


export default function FilesTree({className} : {className?: string}) {
    const fetchFiles = async () => {
        const responce = await fetch(`http://localhost:8080/tree/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });
        if (responce.ok) {
            const data = await responce.json();
            return data;
        }
        return null;
        
    }

    useEffect(() => {
        fetchFiles().then(files => {
            
            setFiles(files);
        })
    }, [])

    const [files, setFiles] = useState<any>();

    const getTree = (el:any, path="") => {
        return <TreeItem path={path + el.name} key={el.name} name={el.name}> 

        {el.childrens != undefined ? el.childrens.map((child:any) => (
                getTree(child, path + el.name+'/')
            )) : undefined}
        </TreeItem>
    }

    return (
        <div className={`${styles.tree} ${className}`}>
            {files != null && files.map((el:any) => (
                getTree(el)
            ))}
        </div>
    );
} 